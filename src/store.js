
import Vuex from 'vuex';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { db } from '@/firebase';
import { doc, addDoc, getDocs, updateDoc, arrayUnion, deleteField, collection, arrayRemove} from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';

export default new Vuex.Store({
    state:{
        class:'something',
        online: null,
        userId: null,
        userDataId:null,
        userData:null,
        userTasks:null,
        authError:null,
        taskCreateWarning:false,
        weeklyActivity:null,
        chartData:{
            labels : [],
            data : []
        }
    },
    mutations:{
        setNetwork(state, bol){
            state.online = bol;
        },
        setUserID(state, user){
            state.userId = user;
            localStorage.setItem('UserID', user);
        },
        setAuthError(state, err){
            state.authError = err;
        },
        setUserDataID(state, userDataID){
            state.userDataId = userDataID;
            localStorage.setItem('userDataId', userDataID);
        },
        setUserData(state, userData){
            state.userData = userData;
            localStorage.setItem('userData', JSON.stringify(userData));
        },
        setUserTasks(state, userTasks){
            state.userTasks = userTasks;
            localStorage.setItem('userTasks', JSON.stringify(userTasks));
        },
        setTaskCreateWarning(state, bol){
            state.taskCreateWarning = bol;
            
        },
        setWeeklyActivity(state, activity){
            state.weeklyActivity = activity;
            localStorage.setItem('weeklyActivity', JSON.stringify(activity));
        },
        setChartData(state, data){
            state.chartData.data = data !== null ? data : [0];
            localStorage.setItem('chartData_data', JSON.stringify(data));
        },
        setChartLabel(state, label){
            state.chartData.labels = label !== null ? label : [0];
            localStorage.setItem('chartData_labels', JSON.stringify(label));
        }
    },
    actions:{
        async checkNetwork({commit}){
            commit('setNetwork', navigator.onLine);

            const userTasks = JSON.parse(localStorage.getItem('userTasks'));
            const weeklyActivity = JSON.parse(localStorage.getItem('weeklyActivity'));
            
            if (this.state.online){
                // Reference to the collection
                const collectionRef = collection(db, 'Users');

                // Get all documents in the collection
                const querySnapshot = await getDocs(collectionRef);

                const user = this.state.userId;
                
                // Iterate over each document in the query snapshot
                querySnapshot.forEach((docu) => {

                    // Get the document data
                    const userID = docu.data().userID;
                    const userData = docu.data()

                    if (userID === user ){
                        const docRef = doc(db, 'Users', docu.id);

                        // Update database document
                        updateDoc(docRef, { userTasks: userTasks });

                        updateDoc(docRef, { weeklyActivity: weeklyActivity });

                    }

                });
            }else{
                //Do Nothing
            }
        },
        async onAuthStateChanged({ commit }) {

            if (this.state.online){

                firebaseOnAuthStateChanged(getAuth(), user => {
                  if (user) {
                    commit('setUserID', user.uid);
                    this.dispatch('getUserData');
                    this.dispatch('chartData');

                  } else {
                    commit('setUserID', null);
                  }
                });
            }else{
                let local = localStorage.getItem('UserID');

                if (local){
                    commit('setUserID', local);
                    this.dispatch('getUserData');
                    this.dispatch('chartData');
                }else{
                    commit('setUserID', null);
                }
            }
        },
        async signIn({commit, dispatch}, {email, pass}){
            try{
                await signInWithEmailAndPassword(getAuth(), email, pass);
                const userUid = getAuth().currentUser.uid;

                commit('setUserID', getAuth().currentUser.uid);
                commit('setAuthError', null);
                dispatch('getUserData');
                this.dispatch('chartData');

            }catch(error){
                let err;
                switch (error.code) {
                    case 'auth/invalid-email':
                        err = 'Invalid email address.';
                        break;
                    case 'auth/user-disabled':
                        err = 'User account is disabled.';
                        break;
                    case 'auth/user-not-found':
                        err = 'User not found.';
                        break;
                    case 'auth/wrong-password':
                        err = 'Incorrect password.';
                        break;
                    case 'auth/invalid-credential':
                        err = 'This user does not exist.';
                        break;
                    default:
                        err = 'Authentication failed. Please try again later.';
                        break;
                }

                commit('setAuthError',err);
            }
        },
        async signUp({commit, dispatch}, {email, pass, goodPass, passMatch}){

            try{
                const getHours = (arr) => {
                    const today = {
                        day : new Date().getDay(), 
                        month : new Date().getMonth(),
                        year : new Date().getFullYear()
                    }
                    
                    
                };

                if(goodPass && passMatch){

                    commit('setAuthError',null);

                    await createUserWithEmailAndPassword(getAuth(), email, pass);

                    //creates document for user in database
                    const userID = getAuth().currentUser.uid;
                    const userEmail = getAuth().currentUser.email;

                    const userDocRef = await addDoc(collection(db, 'Users'),
                        {
                            userID : userID,
                            userEmail : userEmail,
                            userTasks : new Array(),
                            weeklyActivity : new Object()
                        }
                    );

                    commit('setUserID', getAuth().currentUser.uid);
                    dispatch('getUserData');
                    this.dispatch('chartData');

                }else{
                    if(!this.goodPass && this.passMatch){

                        const err = 'password does not meet requirement';
                        commit('setAuthError',err);

                    }else if(this.goodPass && !this.passMatch){
        
                        const err = 'passwords don\'t match';
                        commit('setAuthError',err);

                    }else{
                        const err = 'password does not meet requirement and is mismatched';
                        commit('setAuthError',err);
                    }
                }

            }catch(error){

                let err;

                switch (error.code) {
                  case 'auth/email-already-in-use':
                    err = 'The email address is already in use by another account.';
                    break;
                  case 'auth/invalid-email':
                    err = 'The email address is invalid.';
                    break;
                  case 'auth/operation-not-allowed':
                    err = 'Email/password accounts are not enabled. Contact support.';
                    break;
                  case 'auth/weak-password':
                    err = 'The password is too weak.';
                    break;
                  default:
                    err = 'An error occurred while signing up. Please try again later.';
                    break;
                }

                commit('setAuthError',err);
            }
            
        },
        async logOut({commit}){
            try{
                await signOut(getAuth())
                commit('setUserID', null);
                commit('setUserDataID', null);
                commit('setUserData', null);
                commit('setUserTasks', null);
              
                localStorage.clear();

            }catch(error){
                console.log(error);
            }
        },
        async getUserData({commit}){

            if (this.state.online){
                const user = this.state.userId;

                const querySnapshot = await getDocs(collection(db, "Users"));

                querySnapshot.forEach( data =>{

                    if(data.data().userID === user){

                        (() =>{
                            const userData = data.data();
                            const userTasks = userData.userTasks;

                            commit('setUserTasks', userTasks);
                            commit('setUserData', userData);

                        })();

                        const userDataID = data.id;

                        commit('setUserDataID', userDataID);

                    }else{
                        null
                    }
                })
            }else{
                let userDataID = localStorage.getItem('userDataId');
                let userData = JSON.parse(localStorage.getItem('userData'));
                let userTasks = JSON.parse(localStorage.getItem('userTasks'));

                if (userDataID && userData && userTasks){
                    commit('setUserTasks', userTasks);
                    commit('setUserData', userData);
                    commit('setUserDataID', userDataID);
                }
            }
        },
        async deleteTask({commit}, {taskID}){

            if (this.state.online){
                // Reference to the collection
                const collectionRef = collection(db, 'Users');

                // Get all documents in the collection
                const querySnapshot = await getDocs(collectionRef);

                const user = this.state.userId;
                
                // Iterate over each document in the query snapshot
                querySnapshot.forEach((docu) => {

                    // Get the document data
                    const userID = docu.data().userID;
                    const userData = docu.data()

                    if (userID === user ){
                        const docRef = doc(db, 'Users', docu.id);
                    
                        const dataArray = userData.userTasks;
                        // Modify the array (remove an element)
                        const userTasks = dataArray.filter((item, index) => item.taskID !== taskID);


                        // Update the document with the modified array
                        updateDoc(docRef, { userTasks: userTasks });

                        commit('setUserTasks', userTasks);
                    }

                });
            }else{
                let userTasks = JSON.parse(localStorage.getItem('userTasks'));
                userTasks = userTasks.filter((item, index) => item.taskID !== taskID);

                commit('setUserTasks', userTasks);
            }
        },
        async updateCompleted({commit}, {taskID}){

            if (this.state.online){
            
                try{
                    // Reference to the collection
                    const collectionRef = collection(db, 'Users');

                    // Get all documents in the collection
                    const querySnapshot = await getDocs(collectionRef);

                    const user = this.state.userId;

                    // Iterate over each document in the query snapshot
                    querySnapshot.forEach((docu) => {
                        // Get the document data
                        const userID = docu.data().userID;
                        const userData = docu.data()

                        if (userID === user ){
                            const docRef = doc(db, 'Users', docu.id);
                        
                            const dataArray = userData.userTasks;
                            // Modify the array (remove an element)
                            const userTasks = dataArray.map((item, index) => { 
                                if(item.taskID === taskID){

                                    return { ...item, isCompleted: true }
                                }else{
                                    return item
                                }
                            });

                            // Update the document with the modified array
                            updateDoc(docRef, { userTasks: userTasks });

                            commit('setUserTasks', userTasks);
                        }

                    });
                }catch(err){
                    console.log(err)
                }
            }else{

                let dataArray = JSON.parse(localStorage.getItem('userTasks'));

                if (dataArray){
                    const userTasks = dataArray.map((item, index) => { 
                        if(item.taskID === taskID){

                            return { ...item, isCompleted: true }
                        }else{
                            return item
                        }
                    });

                    commit('setUserTasks', userTasks);
                }
            }
        },
        async updateIsTiming({commit}, {taskID, isTiming}){
            if (this.state.online){
            
                try{
                    // Reference to the collection
                    const collectionRef = collection(db, 'Users');

                    // Get all documents in the collection
                    const querySnapshot = await getDocs(collectionRef);

                    const user = this.state.userId;

                    // Iterate over each document in the query snapshot
                    querySnapshot.forEach((docu) => {
                        // Get the document data
                        const userID = docu.data().userID;
                        const userData = docu.data()

                        if (userID === user ){
                            const docRef = doc(db, 'Users', docu.id);
                        
                            const dataArray = userData.userTasks;
                            // Modify the array (remove an element)
                            const userTasks = dataArray.map((item, index) => { 
                                if(item.taskID === taskID){

                                    return { ...item, isTiming: isTiming }
                                }else{
                                    return item
                                }
                            });

                            // Update the document with the modified array
                            updateDoc(docRef, { userTasks: userTasks });

                            commit('setUserTasks', userTasks);
                        }

                    });
                }catch(err){
                    console.log(err)
                }
            }else{

                let dataArray = JSON.parse(localStorage.getItem('userTasks'));

                if (dataArray){
                    const userTasks = dataArray.map((item, index) => { 
                        if(item.taskID === taskID){

                            return { ...item, isTiming: isTiming };
                        }else{
                            return item
                        }
                    });

                    commit('setUserTasks', userTasks);
                }
            }
        },
        async createTask({commit}, {taskName, taskDesc, taskTag, taskTagColor, taskTime}){
            if (taskDesc !== '' && taskName !== '' && taskTag !== ''){


                if (this.state.online){

                    commit('setTaskCreateWarning', false);

                    try{

                        //generates random id
                        let randomID = () =>{ 

                            let rand = '';

                            for (let i = 1; i < 10 ; i++){
                                let factor = i **2
                                rand += `${Math.ceil(Math.random() * factor)}`;
                            }

                            return Number(rand);
                        };

                        //obect for new task
                        let newTask = {
                            taskID : randomID(),
                            taskName : taskName,
                            taskDesc : taskDesc,
                            taskTag : taskTag,
                            taskTagColor : taskTagColor,
                            taskTime : taskTime === null ? 0 : this.taskTime,
                            isActive : false,
                            isCompleted : false,
                            isTiming : false,
                            dateCreated : new Date(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`)
                        }

                        const taskRef = doc(db, "Users", this.state.userDataId);

                        await updateDoc(taskRef, {
                            userTasks: arrayUnion(newTask)
                        });

                        commit('setUserTasks', taskRef.userTasks);



                    }catch(err){
                        console.log(err);
                    }
                }else{

                    commit('setTaskCreateWarning', false);

                    let local = JSON.parse(localStorage.getItem('userTasks'));

                    if (local){
                        //generates random id
                        let randomID = () =>{ 

                            let rand = '';

                            for (let i = 1; i < 10 ; i++){
                                let factor = i **2
                                rand += `${Math.ceil(Math.random() * factor)}`;
                            }

                            return Number(rand);
                        };

                        //obect for new task
                        let newTask = {
                            taskID : randomID(),
                            taskName : taskName,
                            taskDesc : taskDesc,
                            taskTag : taskTag,
                            taskTagColor : taskTagColor,
                            taskTime : taskTime === null ? 0 : this.taskTime,
                            isActive : false,
                            isCompleted : false,
                            dateCreated : new Date(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`)
                        }
                        local.push(newTask);
                        commit('setUserTasks', local);

                    }
                }
            }else{
                commit('setTaskCreateWarning', true);
            }

        },
        async updateTime({commit}, {elapsedTime, taskID}){

            if (this.state.online){

                try{
                    // Reference to the collection
                    const collectionRef =  collection(db, 'Users');

                    // Get all documents in the collection
                    const querySnapshot = await getDocs(collectionRef);

                    console.log('first point' + ' ' + elapsedTime);

                    // Iterate over each document in the query snapshot
                    querySnapshot.forEach((docu) => {
                        // Get the document data
                        const userID = docu.data().userID;
                        const userData = docu.data();


                        if (userID === this.state.userId ){
                            const docRef = doc(db, 'Users', docu.id);
                            const dataArray = userData.userTasks;


                            // Modify the array (remove an element)
                            const updatedArray = dataArray.map((item, index) => { 

                                if(item.taskID === taskID){  
                                    return { ...item, taskTime: elapsedTime}
                                }else{
                                    return item
                                }

                            });

                            // Update the document with the modified array
                            updateDoc(docRef, { userTasks: updatedArray });

                            commit('setUserTasks', updatedArray);
                        }else{
                            //do nothing
                        }
                    
                    });
                }catch(err){
                    console.log(err)
                }
            }else{
                let local = JSON.parse(localStorage.getItem('userTasks'));

                if(local){
                    const updatedArray = local.map((item, index) => { 

                        if(item.taskID === taskID){  
                            return { ...item, taskTime: elapsedTime}
                        }else{
                            return item
                        }

                    });

                    commit('setUserTasks', updatedArray);
                }
            }

        },
        async graphDate({commit}, {time}){

            //FIXME fix mapping
            const date = new Date().getDate();
            const thisMonth = new Date().getMonth();
            const thisYear = new Date().getFullYear();
            
            const today = new Date(`${thisYear}-${thisMonth}-${date}`);
            
            const getISOWeek = (date) => {
                const onejan = new Date(date.getFullYear(), 0, 1);
                return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
            }
            const thisWeek = getISOWeek(today);

            if(this.state.online){
                try{

                    // Reference to the collection
                    const collectionRef = collection(db, 'Users');

                    // Get all documents in the collection
                    const querySnapshot = await getDocs(collectionRef);

                    const user = this.state.userId;

                
                    // Iterate over each document in the query snapshot
                    querySnapshot.forEach((docu) => {
                        // Get the document data
                        const userID = docu.data().userID;
                        const userData = docu.data();


                        if (userID === this.state.userId ){
                            const docRef = doc(db, 'Users', docu.id);
                            const weeklyActivity = userData.weeklyActivity;


                            if (!weeklyActivity[thisWeek]){
                                weeklyActivity[thisWeek] = time;
                            }else{
                                weeklyActivity[thisWeek] += time;
                            }


                            // Update the document with the modified array
                            updateDoc(docRef, { weeklyActivity: weeklyActivity });

                            commit('setWeeklyActivity', weeklyActivity);
                        }else{
                            //do nothing
                        }
                    
                    });

                }catch(error){
                    console.log(error);
                }
            }else{

                let local = JSON.parse(localStorage.getItem('weeklyActivity'));

                if(local){
                    
                    if (!local[thisWeek]){
                        local[thisWeek] = time;
                    }else{
                        local[thisWeek] += time;
                    }
                }

                commit('setWeeklyActivity', local);
            }
        },
        async chartData({commit}){

            if(this.state.online){
                try{

                    // Reference to the collection
                    const collectionRef = collection(db, 'Users');

                    // Get all documents in the collection
                    const querySnapshot = await getDocs(collectionRef);

                    const user = this.state.userId;

                
                    // Iterate over each document in the query snapshot
                    querySnapshot.forEach((docu) => {
                        // Get the document data
                        const userID = docu.data().userID;
                        const userData = docu.data();


                        if (userID === this.state.userId ){
                            const docRef = doc(db, 'Users', docu.id);
                            const weeklyActivity = userData.weeklyActivity;

                            let label = Object.keys(weeklyActivity);
                            let data = Object.values(weeklyActivity);

                            commit('setChartData', data);
                            commit('setChartLabel', label); 

                            commit('setWeeklyActivity', weeklyActivity);
                        }else{
                            //do nothing
                        }
                    
                    });

                }catch(error){
                    console.log(error);
                }
            }else{
                let weeklyActivity = JSON.parse(localStorage.getItem('weeklyActivity'));

                if(weeklyActivity){
                    let label = Object.keys(weeklyActivity);
                    let data = Object.values(weeklyActivity);

                    commit('setChartData', data);
                    commit('setChartLabel', label); 

                    commit('setWeeklyActivity', weeklyActivity);
                }

            }
        }
    
    },
    getters:{
        allTasks : state => {
            if (!state.userTasks) {
                return [];
            }
            return state.userTasks;
        },
        completedTasks : (state, getters) => {
            return getters.allTasks.filter(elem => {
                return elem.isCompleted === true; 
            }) 
        },
        inCompletedTasks : (state, getters) =>{
            return getters.allTasks.filter(elem => {
                return elem.isCompleted === false; 
            }) 
        },
        inCompletedLength : (state, getters) =>{
            return getters.inCompletedTasks.length;
        },
        hoursWorked : (state) =>{
            return state.chartData.data.map(elem => elem / (1000 * 60 * 60));
        }

    }
})