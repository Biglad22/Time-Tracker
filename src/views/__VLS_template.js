import createTask from '@/components/createTask.vue';
import { __VLS_componentsOption, __VLS_name } from './timeTracker.vue';

function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'createTask', typeof __VLS_localComponents, "CreateTask", "createTask", "createTask"> &
__VLS_WithComponent<'task', typeof __VLS_localComponents, "Task", "task", "task">;
__VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div;
__VLS_intrinsicElements.nav; __VLS_intrinsicElements.nav;
__VLS_components.CreateTask; __VLS_components.createTask;
// @ts-ignore
[createTask,];
__VLS_intrinsicElements.main; __VLS_intrinsicElements.main;
__VLS_intrinsicElements.h6; __VLS_intrinsicElements.h6;
__VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span; __VLS_intrinsicElements.span;
__VLS_intrinsicElements.p; __VLS_intrinsicElements.p;
__VLS_intrinsicElements.hr;
__VLS_components.Task; __VLS_components.Task; __VLS_components.task; __VLS_components.task;
// @ts-ignore
[task, task,];
__VLS_intrinsicElements.template; __VLS_intrinsicElements.template; __VLS_intrinsicElements.template; __VLS_intrinsicElements.template;
{
const __VLS_0 = __VLS_intrinsicElements["div"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
const __VLS_2 = __VLS_1({ ...{}, class: ("relative h-full flex flex-wrap flex-col"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, class: ("relative h-full flex flex-wrap flex-col"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = __VLS_intrinsicElements["nav"];
const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
const __VLS_7 = __VLS_6({ ...{}, class: ("w-full flex flex-wrap mb-10 justify-between bg-[var(--background-color)] sticky top-0 z-50 py-3.5 pt-0 items-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, class: ("w-full flex flex-wrap mb-10 justify-between bg-[var(--background-color)] sticky top-0 z-50 py-3.5 pt-0 items-center"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
{
const __VLS_10 = __VLS_intrinsicElements["div"];
const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
const __VLS_12 = __VLS_11({ ...{}, class: ("text-[var(--text-l)]"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, class: ("text-[var(--text-l)]"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
{
const __VLS_15 = __VLS_intrinsicElements["div"];
const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
const __VLS_17 = __VLS_16({ ...{}, class: ("today capitalize text-xs me-5 sm:me-10 hidden sm:inline-block"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{}, class: ("today capitalize text-xs me-5 sm:me-10 hidden sm:inline-block"), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
(__VLS_ctx.clock);
}
}
div >

<__VLS_ctx.div class="today capitalize text-xs inline-block">
{{ __VLS_ctx, : .whatDay }} );
(__VLS_18.slots!).default;
}
(__VLS_13.slots!).default;
}
{ }
const __VLS_20 = ( as 'CreateTask' extends keyof typeof __VLS_ctx ? {'createTask'}: typeof __VLS_ctx.CreateTask }: 'createTask' extends keyof typeof __VLS_ctx ? {'createTask'}: typeof __VLS_ctx.createTask }: typeof __VLS_resolvedLocalAndGlobalComponents).createTask;
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({...{ onUpdateAdderMenu: {} as any, }, isVisible}: ((__VLS_ctx.adderIsVisible)), }));
( as {createTask}: typeof __VLS_20 }).createTask;
const __VLS_22 = __VLS_21({...{ onUpdateAdderMenu: {} as any, }, isVisible}: ((__VLS_ctx.adderIsVisible)), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_20 />, typeof __VLS_22> & Record<string />, unknown>) => void)({...{ onUpdateAdderMenu: {} as any, }, isVisible}: ((__VLS_ctx.adderIsVisible)), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23 />.emit>;
let __VLS_25 = {'updateAdderMenu'}: __VLS_pickEvent(__VLS_24['updateAdderMenu'], ( as __VLS_FunctionalComponentProps<typeof __VLS_21 />, typeof __VLS_22>).onUpdateAdderMenu) };
__VLS_25 = {updateAdderMenu}: (__VLS_ctx.updateAdderMenu) };
}
(__VLS_8.slots!).default;
}
{ }
const __VLS_26 = __VLS_intrinsicElements["main"];
const __VLS_27 = __VLS_elementAsFunctionalComponent(__VLS_26);
const __VLS_28 = __VLS_27({...{}, class { }}: (" flex-1 flex-shrink relative"), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_26 />, typeof __VLS_28> & Record<string />, unknown>) => void)({...{}, class { }}: (" flex-1 flex-shrink relative"), });
const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28)!;
let __VLS_30!: __VLS_NormalizeEmits<typeof __VLS_29 />.emit>;
if (__VLS_ctx.tasks < /> 1) {{
const: __VLS_31 = __VLS_intrinsicElements["div"],
const: __VLS_32 = __VLS_elementAsFunctionalComponent(__VLS_31),
const: __VLS_33 = __VLS_32({ ...{}, class: (" text-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_32))
}({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_31, typeof __VLS_33> & Record<string, unknown>) => void)({ ...{}, class: (" text-center"), })};
const __VLS_34 = __VLS_pickFunctionalComponentCtx(__VLS_31, __VLS_33)!;
let __VLS_35!: __VLS_NormalizeEmits<typeof __VLS_34 />.emit>;
{ }
const __VLS_36 = __VLS_intrinsicElements["h6"];
const __VLS_37 = __VLS_elementAsFunctionalComponent(__VLS_36);
const __VLS_38 = __VLS_37({...{}, class { }}: (" capitalize text-[var(--text-l)]"), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_36 />, typeof __VLS_38> & Record<string />, unknown>) => void)({...{}, class { }}: (" capitalize text-[var(--text-l)]"), });
const __VLS_39 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38)!;
let __VLS_40!: __VLS_NormalizeEmits<typeof __VLS_39 />.emit>;
(__VLS_39.slots!).default;
}
(__VLS_34.slots!).default;
}
// @ts-ignore
[clock,div,whatDay,adderIsVisible,adderIsVisible,adderIsVisible,updateAdderMenu,tasks,];
}
else { }
for (const [i , index] of __VLS_getVForSourceType((__VLS_ctx.tasks)!)) {{
const: __VLS_41 = __VLS_intrinsicElements["div"],
const: __VLS_42 = __VLS_elementAsFunctionalComponent(__VLS_41),
const: __VLS_43 = __VLS_42({ ...{}, class: ("mb-12 "), }, ...__VLS_functionalComponentArgsRest(__VLS_42))
}({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_41, typeof __VLS_43> & Record<string, unknown>) => void)({ ...{}, class: ("mb-12 "), })};
const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_41, __VLS_43)!;
let __VLS_45!: __VLS_NormalizeEmits<typeof __VLS_44 />.emit>;
{ }
const __VLS_46 = __VLS_intrinsicElements["span"];
const __VLS_47 = __VLS_elementAsFunctionalComponent(__VLS_46);
const __VLS_48 = __VLS_47({...{}, class { }}: ("this-week w-full px-1.5 py-3.5 bg-[var(--secondary-color)] block rounded-sm sticky top-0 z-20 backdrop-blur-md"), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_46 />, typeof __VLS_48> & Record<string />, unknown>) => void)({...{}, class { }}: ("this-week w-full px-1.5 py-3.5 bg-[var(--secondary-color)] block rounded-sm sticky top-0 z-20 backdrop-blur-md"), });
const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48)!;
let __VLS_50!: __VLS_NormalizeEmits<typeof __VLS_49 />.emit>;
{ }
const __VLS_51 = __VLS_intrinsicElements["p"];
const __VLS_52 = __VLS_elementAsFunctionalComponent(__VLS_51);
const __VLS_53 = __VLS_52({...{}, class { }}: ("tag-name text-[var(--text-m)] capitalize font-medium"), }, ...__VLS_functionalComponentArgsRest(__VLS_52));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_51 />, typeof __VLS_53> & Record<string />, unknown>) => void)({...{}, class { }}: ("tag-name text-[var(--text-m)] capitalize font-medium"), });
const __VLS_54 = __VLS_pickFunctionalComponentCtx(__VLS_51, __VLS_53)!;
let __VLS_55!: __VLS_NormalizeEmits<typeof __VLS_54 />.emit>;
(__VLS_54.slots!).default;
}
(__VLS_49.slots!).default;
}
{ }
const __VLS_56 = __VLS_intrinsicElements["div"];
const __VLS_57 = __VLS_elementAsFunctionalComponent(__VLS_56);
const __VLS_58 = __VLS_57({...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_57));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_56 />, typeof __VLS_58> & Record<string />, unknown>) => void)({...{}, });
const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58)!;
let __VLS_60!: __VLS_NormalizeEmits<typeof __VLS_59 />.emit>;
{ }
const __VLS_61 = __VLS_intrinsicElements["span"];
const __VLS_62 = __VLS_elementAsFunctionalComponent(__VLS_61);
const __VLS_63 = __VLS_62({...{}, class { }}: ("flex flex-wrap gap-1.5 py-7 pb-2.5 items-center text-[var(--text-l)]"), }, ...__VLS_functionalComponentArgsRest(__VLS_62));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_61 />, typeof __VLS_63> & Record<string />, unknown>) => void)({...{}, class { }}: ("flex flex-wrap gap-1.5 py-7 pb-2.5 items-center text-[var(--text-l)]"), });
const __VLS_64 = __VLS_pickFunctionalComponentCtx(__VLS_61, __VLS_63)!;
let __VLS_65!: __VLS_NormalizeEmits<typeof __VLS_64 />.emit>;
{ }
const __VLS_66 = __VLS_intrinsicElements["span"];
const __VLS_67 = __VLS_elementAsFunctionalComponent(__VLS_66);
const __VLS_68 = __VLS_67({...{}, class { }}: ("block uppercase tag-name"), }, ...__VLS_functionalComponentArgsRest(__VLS_67));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_66 />, typeof __VLS_68> & Record<string />, unknown>) => void)({...{}, class { }}: ("block uppercase tag-name"), });
const __VLS_69 = __VLS_pickFunctionalComponentCtx(__VLS_66, __VLS_68)!;
let __VLS_70!: __VLS_NormalizeEmits<typeof __VLS_69 />.emit>;
( 'gow' );
(__VLS_69.slots!).default;
}
{ }
const __VLS_71 = __VLS_intrinsicElements["hr"];
const __VLS_72 = __VLS_elementAsFunctionalComponent(__VLS_71);
const __VLS_73 = __VLS_72({...{}, class { }}: (" flex-1 border-[var(--text-l)]"), }, ...__VLS_functionalComponentArgsRest(__VLS_72));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_71 />, typeof __VLS_73> & Record<string />, unknown>) => void)({...{}, class { }}: (" flex-1 border-[var(--text-l)]"), });
const __VLS_74 = __VLS_pickFunctionalComponentCtx(__VLS_71, __VLS_73)!;
let __VLS_75!: __VLS_NormalizeEmits<typeof __VLS_74 />.emit>;
}
(__VLS_64.slots!).default;
}
{ }
const __VLS_76 = ( as 'Task' extends keyof typeof __VLS_ctx ? {'task'}: typeof __VLS_ctx.Task }: 'task' extends keyof typeof __VLS_ctx ? {'task'}: typeof __VLS_ctx.task }: typeof __VLS_resolvedLocalAndGlobalComponents).task;
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({...{}, tag}: ((i.taskTag)), isCompleted: ((i.isCompleted)), tagColor: ((i.taskTagColor)), taskTime: ((i.taskTime)), taskID: ((i.taskID)), adderIsVisible: ((__VLS_ctx.adderIsVisible)), class: ("mb-3.5"), }));
( as {task}: typeof __VLS_76 }).task;
( as {task}: typeof __VLS_76 }).task;
const __VLS_78 = __VLS_77({...{}, tag}: ((i.taskTag)), isCompleted: ((i.isCompleted)), tagColor: ((i.taskTagColor)), taskTime: ((i.taskTime)), taskID: ((i.taskID)), adderIsVisible: ((__VLS_ctx.adderIsVisible)), class: ("mb-3.5"), }, ...__VLS_functionalComponentArgsRest(__VLS_77));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_76 />, typeof __VLS_78> & Record<string />, unknown>) => void)({...{}, tag}: ((i.taskTag)), isCompleted: ((i.isCompleted)), tagColor: ((i.taskTagColor)), taskTime: ((i.taskTime)), taskID: ((i.taskID)), adderIsVisible: ((__VLS_ctx.adderIsVisible)), class: ("mb-3.5"), });
const __VLS_79 = __VLS_pickFunctionalComponentCtx(__VLS_76, __VLS_78)!;
let __VLS_80!: __VLS_NormalizeEmits<typeof __VLS_79 />.emit>;
{ }
const __VLS_81 = __VLS_intrinsicElements["template"];
const __VLS_82 = __VLS_elementAsFunctionalComponent(__VLS_81);
const __VLS_83 = __VLS_82({...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_82));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_81 />, typeof __VLS_83> & Record<string />, unknown>) => void)({...{}, });
{(__VLS_79.slots!)["task-name"]};
( i.taskName );
// @ts-ignore
[tasks,adderIsVisible,adderIsVisible,adderIsVisible,];
}
}
{ }
const __VLS_84 = __VLS_intrinsicElements["template"];
const __VLS_85 = __VLS_elementAsFunctionalComponent(__VLS_84);
const __VLS_86 = __VLS_85({...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_85));
( as (props: __VLS_FunctionalComponentProps<typeof __VLS_84 />, typeof __VLS_86> & Record<string />, unknown>) => void)({...{}, });
{(__VLS_79.slots!)["task-desc"]};
( i.taskDesc );
}
}
}
(__VLS_59.slots!).default;
}
(__VLS_44.slots!).default;
}
}
}
(__VLS_29.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses))
var __VLS_slots!:;
return __VLS_slots;
}
let __VLS_internalComponent!: typeof import('./timeTracker.vue')['default'];
</>;
}
}
}
