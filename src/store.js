
import Vuex from 'vuex';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { db } from '@/firebase';
import { doc, addDoc, getDocs, updateDoc, arrayUnion, deleteField, collection, arrayRemove} from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';

export default new Vuex.Store({
    state:{
        online: navigator.onLine,
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
        },
        playingTimer:{},
        ready:false,

        //offline changes
        pendingTaskChanges:null,
        pendingWeeklyActivity:null,
        saveComplete : null,
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
        },

        //timer settings
        setPlayingTimer(state, payload){

            if (!state.playingTimer[payload.taskID]){
                state.playingTimer = { ...state.playingTimer, [payload.taskID] : { isTiming : payload.bol, taskInterval : payload.taskInterval}};
                localStorage.setItem('playingTimer', JSON.stringify(state.playingTimer));
            }else{
                //do nothing
            }
        },
        setReady(state, bol){
            state.ready = bol
        },

        //offline changes
        setPendingTaskChanges(state, task){
            state.pendingTaskChanges = task;
            localStorage.setItem('pendingTaskChanges', JSON.stringify(task));
        },
        setPendingWeeklyActivity(state, activity){
            state.pendingWeeklyActivity = activity;
            localStorage.setItem('pendingWeeklyActivity', JSON.stringify(activity));
        },
        setClearPendingTaskChanges(state){
            state.pendingTaskChanges = null;
            localStorage.setItem('pendingTaskChanges',JSON.stringify(null));
        },
        setClearPendingWeeklyActivity(state){
            state.pendingWeeklyActivity = null;
            localStorage.setItem('pendingWeeklyActivity', JSON.stringify(null));
        },
        setSaveComplete(state, bol){
            state.saveComplete = bol;
        },

        //timer playing state 
        setPlaying(state, payload){

            state.playingTimer[payload.taskID].taskInterval = payload.taskInterval;
            state.playingTimer[payload.taskID].isTiming = payload.bol;


            localStorage.setItem('playingTimer', JSON.stringify(state.playingTimer));
        }, 
        setPause(state, payload){

            state.playingTimer[payload.taskID].taskInterval = payload.taskInterval;
            state.playingTimer[payload.taskID].isTiming = payload.bol;


            localStorage.setItem('playingTimer', JSON.stringify(state.playingTimer));
        }

    },
    actions:{
        async updateServer({commit}, {pass}){
            
            if(pass){ 

                try{

                    firebaseOnAuthStateChanged(getAuth(), user => {
                      if (user) {
                        commit('setUserID', user.uid);
                      } else {
                        commit('setUserID', null);
                        commit('setReady', true);
                      }
                    })


                    const pendingTaskChanges = JSON.parse(localStorage.getItem('pendingTaskChanges'));
                    const pendingWeeklyActivity = JSON.parse(localStorage.getItem('pendingWeeklyActivity'));

                    commit('setSaveComplete', false);


                    const taskRef = doc(db, "Users", this.state.userDataId);

                    switch (true) {

                        case pendingWeeklyActivity !== null && pendingTaskChanges !== null:


                            await updateDoc(taskRef, {
                                userTasks: pendingTaskChanges
                            });

                            await updateDoc(taskRef, {
                                weeklyActivity: pendingWeeklyActivity
                            });
                        

                            await this.dispatch('getUserData');
                            commit('setClearPendingWeeklyActivity');
                            commit('setClearPendingTaskChanges');

                            break;
                        
                        case pendingWeeklyActivity !== null && pendingTaskChanges === null:
                            pendingWeeklyActivity = JSON.parse(localStorage.getItem('pendingWeeklyActivity'));

                            await updateDoc(taskRef, {
                                weeklyActivity: pendingWeeklyActivity
                            });

                            await this.dispatch('getUserData');
                            commit('setClearPendingWeeklyActivity');

                            break;


                        case pendingWeeklyActivity === null && pendingTaskChanges !== null:

                            pendingTaskChanges = JSON.parse(localStorage.getItem('pendingTaskChanges'));

                            await updateDoc(taskRef, {
                                userTasks: pendingTaskChanges
                            });

                            await this.dispatch('getUserData');
                            commit('setClearPendingTaskChanges');

                            break;

                        case pendingWeeklyActivity === null && pendingTaskChanges !== null:


                        default:
                            commit('setSaveComplete', true);
                            break;
                    }
                }
                catch(err){
                    console.log(err);
                }



                

            }else{
                
                const pendingTaskChanges = localStorage.getItem('pendingTaskChanges');
                const pendingWeeklyActivity = localStorage.getItem('pendingWeeklyActivity');
                //do nothing
            }
        },
        // async checkNetwork({commit}){
        //     commit('setNetwork', navigator.onLine);


        //     if (localStorage.getItem('userTasks') && localStorage.getItem('weeklyActivity')){
        //         const userTasks = JSON.parse(localStorage.getItem('userTasks'));
        //         const weeklyActivity = JSON.parse(localStorage.getItem('weeklyActivity'));
            

        //         if (this.state.online){
        //             // Reference to the collection
        //             const collectionRef = collection(db, 'Users');

        //             // Get all documents in the collection
        //             const querySnapshot = await getDocs(collectionRef);

        //             const user = this.state.userId;

        //             // Iterate over each document in the query snapshot
        //             querySnapshot.forEach((docu) => {

        //                 // Get the document data
        //                 const userID = docu.data().userID;
        //                 const userData = docu.data()

        //                 if (userID === user ){
        //                     const docRef = doc(db, 'Users', docu.id);

        //                     // Update database document
        //                     updateDoc(docRef, { userTasks: userTasks });

        //                     updateDoc(docRef, { weeklyActivity: weeklyActivity });

        //                 }

        //             });
        //         }else{
        //             //Do Nothing
        //         }
        //     }
        // },
        async onAuthStateChanged({ commit }) {

            if (this.state.online){

                firebaseOnAuthStateChanged(getAuth(), user => {

                  if (user) {

                    commit('setUserID', user.uid);
                    this.dispatch('getUserData');
                    this.dispatch('chartData');

                  } else {
                    commit('setUserID', null);
                    commit('setReady', true);
                  }
                })
            }else{
                let local = localStorage.getItem('UserID');

                if (local){
                    commit('setUserID', local);
                    this.dispatch('getUserData');
                    this.dispatch('chartData');

                    commit('setReady', true);
                    commit('setSaveComplete', false);
                }else{
                    commit('setUserID', null);
                    commit('setReady', true);
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
                    case 'auth/invalid-login-credentials':
                        err = 'Incorrect email / password.';
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

            if (navigator.onLine){
                const user = this.state.userId;
                
                try{

                    const querySnapshot = await getDocs(collection(db, "Users"));

                    querySnapshot.forEach( data => {

                        if(data.data().userID === user){

                            (async () =>{
                                const userData =  data.data();
                                const userTasks = await userData.userTasks;
                                const weeklyActivity = await userData.weeklyActivity;

                                commit('setUserTasks', userTasks);
                                commit('setWeeklyActivity', weeklyActivity);
                                commit('setUserData', userData);
                                

                                if(userTasks.length > 0){
                                    userTasks.forEach( task => {
                                        return commit('setPlayingTimer', {taskID : task.taskID, taskInterval : null, bol : false})
                                    });
                                }else{
                                    //do nothing
                                }

                                commit('setReady', true);
                                commit('setSaveComplete', true);
                                

                            })();

                            const userDataID = data.id;
                            commit('setUserDataID', userDataID);

                        }else{
                            null
                        }
                    })
                }
                catch(err){
                    console.log(err);
                }
            }else{
                let userDataID = localStorage.getItem('userDataId');
                let userData = JSON.parse(localStorage.getItem('userData'));
                let userTasks = JSON.parse(localStorage.getItem('userTasks'));
                let weeklyActivity = JSON.parse(localStorage.getItem('weeklyActivity'));

                if (userDataID && userData && userTasks){

                    userTasks.forEach(task => {
                        return commit('setPlayingTimer',{taskID : task.taskID, bol : false})
                    });

                    commit('setUserTasks', userTasks);
                    commit('setPendingTaskChanges', userTasks);
                    commit('setWeeklyActivity', weeklyActivity);
                    commit('setPendingWeeklyActivity', weeklyActivity);
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

                        this.dispatch('getUserData');
                    }

                });
            }else{
                let userTasks = JSON.parse(localStorage.getItem('userTasks'));
                const newUserTasks = userTasks.filter((item, index) => item.taskID !== taskID);

                this.dispatch('getUserData');
                commit('setPendingTaskChanges', newUserTasks);
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
                    commit('setPendingTaskChanges', userTasks);
                }
            }
        },
        async createTask({commit}, {taskName, taskDesc, taskTag, taskTagColor, taskTime}){
            if (taskDesc !== '' && taskName !== '' && taskTag !== '' && taskDesc !== null && taskName !== null && taskTag !== null){


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
                            dateCreated : `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
                        }

                        const taskRef = doc(db, "Users", this.state.userDataId);

                        await updateDoc(taskRef, {
                            userTasks: arrayUnion(newTask)
                        });

                       this.dispatch('getUserData')
                        

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
                            dateCreated : `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
                        }
                        local.push(newTask);

                        commit('setPlayingTimer',{taskID : newTask.taskID, bol : false})
                        commit('setUserTasks', local);
                        commit('setPendingTaskChanges', local);

                    }
                }
            }else{
                commit('setTaskCreateWarning', true);
            }

        },
        async updateTime({commit}, {elapsedTime, taskID}){

            if (this.state.online){

                try{

                    // Get all documents in the collection
                    const querySnapshot = await getDocs(collection(db, 'Users'));

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

                                if(item.taskID == taskID){  
                                    return { ...item, taskTime: item.taskTime + elapsedTime}
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
                            return { ...item, taskTime: item.taskTime + elapsedTime}
                        }else{
                            return item
                        }

                    });

                    commit('setUserTasks', updatedArray);
                    commit('setPendingTaskChanges', updatedArray);
                }
            }

        },
        async graphDate({commit}, {time}){

            const date = new Date().getDate();
            const thisMonth = new Date().getMonth();
            const thisYear = new Date().getFullYear();
            
            const today = new Date(`${thisYear}-${thisMonth}-${date}`);
            
            const getISOWeek = (date) => {

                const month = ['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec']

                const weekStartDate = date;

                weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay()); // Start of week

                const weekEndDate = new Date(weekStartDate);

                weekEndDate.setDate(weekEndDate.getDate() + 6); // End of week

                const weekRange = `${month[weekEndDate.getMonth() + 1]} ${weekStartDate.toISOString().slice(8, 10)} - ${weekEndDate.toISOString().slice(8, 10)} ${weekEndDate.getFullYear()}`;
                
                return weekRange
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
                            commit('setPendingWeeklyActivity', weeklyActivity);
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
                commit('setPendingWeeklyActivity', local);
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
        },

        //time actions
        startTimer({commit}, {taskID, start}){

            commit('setPlaying', {taskID : taskID, bol : true,  

                taskInterval :  setInterval(()=>{

                this.dispatch('graphDate',{
                    time: 1000
                });

                this.dispatch('updateTime', {
                    elapsedTime : 1000, 
                    taskID : taskID
                });
                
            }, 1000)});
        },
        pauseTime({commit}, taskID){

            clearInterval(this.state.playingTimer[taskID].taskInterval);
            commit('setPause', {taskID : taskID, taskInterval : null, bol : false});

        },
    
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
        },
        isLoading: (state) => {
            return state.ready ? false : true;
        },
        saved: (state) =>{
            return state.saveComplete ? true : false;
        },
        timerState:(state) => (taskID)=>{
            return state.playingTimer[taskID].isTiming !== undefined ? state.playingTimer[taskID].isTiming : null;
            
        },
        taskTime:(state) => (taskID)=>{

            let time
            state.userTasks.forEach(task => {
                if (task.taskID === taskID){
                   return time =  task.taskTime !== undefined ? task.taskTime : null;
                }else{
                    null
                }

            });
            return time; 
            
        }
    }
})