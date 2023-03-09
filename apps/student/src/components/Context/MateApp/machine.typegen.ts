
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.mate_app_machine.mateStepper.dormPreference.Saving Dorm Preference:invocation[0]": { type: "done.invoke.mate_app_machine.mateStepper.dormPreference.Saving Dorm Preference:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.mate_app_machine.mateStepper.roommatePreference.Saving Roommate Preference:invocation[0]": { type: "done.invoke.mate_app_machine.mateStepper.roommatePreference.Saving Roommate Preference:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.mate_app_machine.mateStepper.selfProfile.Saving Profile:invocation[0]": { type: "done.invoke.mate_app_machine.mateStepper.selfProfile.Saving Profile:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.regenerate_profile": { type: "done.invoke.regenerate_profile"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.regenerate_profile": { type: "error.platform.regenerate_profile"; data: unknown };
"xstate.after(1000)#mate_app_machine.finetuner.generate errored": { type: "xstate.after(1000)#mate_app_machine.finetuner.generate errored" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "regenerateProfile": "done.invoke.regenerate_profile";
"saveDormPref": "done.invoke.mate_app_machine.mateStepper.dormPreference.Saving Dorm Preference:invocation[0]";
"saveMatePref": "done.invoke.mate_app_machine.mateStepper.roommatePreference.Saving Roommate Preference:invocation[0]";
"saveProfile": "done.invoke.mate_app_machine.mateStepper.selfProfile.Saving Profile:invocation[0]";
        };
        missingImplementations: {
          actions: "assignDormPrefFormInputToCtx" | "assignMatePrefFormInputToCtx" | "assignProfileFormInputToCtx" | "clearErrorCount" | "decrementStep" | "incrementErrorCount" | "incrementStep" | "pickProfile" | "updateGeneratedProfile";
          delays: never;
          guards: "isInitialize" | "notExceedErrorLimitCount";
          services: "regenerateProfile" | "saveDormPref" | "saveMatePref" | "saveProfile";
        };
        eventsCausingActions: {
          "assignDormPrefFormInputToCtx": "Form Input Changed";
"assignMatePrefFormInputToCtx": "Form Input Changed";
"assignProfileFormInputToCtx": "Form Input Changed";
"clearErrorCount": "done.invoke.regenerate_profile";
"decrementStep": "PREV";
"incrementErrorCount": "error.platform.regenerate_profile";
"incrementStep": "done.invoke.mate_app_machine.mateStepper.roommatePreference.Saving Roommate Preference:invocation[0]" | "done.invoke.mate_app_machine.mateStepper.selfProfile.Saving Profile:invocation[0]";
"pickProfile": "PICKED";
"updateGeneratedProfile": "done.invoke.regenerate_profile";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "isInitialize": "";
"notExceedErrorLimitCount": "error.platform.regenerate_profile";
        };
        eventsCausingServices: {
          "regenerateProfile": "" | "PICKED" | "done.invoke.mate_app_machine.mateStepper.dormPreference.Saving Dorm Preference:invocation[0]" | "xstate.after(1000)#mate_app_machine.finetuner.generate errored";
"saveDormPref": "SUBMIT";
"saveMatePref": "SUBMIT";
"saveProfile": "SUBMIT";
        };
        matchesStates: "finetuner" | "finetuner.error limit exceeded" | "finetuner.generate errored" | "finetuner.loading" | "finetuner.show" | "mateStepper" | "mateStepper.dormPreference" | "mateStepper.dormPreference.Saving Dorm Preference" | "mateStepper.dormPreference.showing form" | "mateStepper.roommatePreference" | "mateStepper.roommatePreference.Saving Roommate Preference" | "mateStepper.roommatePreference.showing form" | "mateStepper.selfProfile" | "mateStepper.selfProfile.Saving Profile" | "mateStepper.selfProfile.showing form" | "unknown" | { "finetuner"?: "error limit exceeded" | "generate errored" | "loading" | "show";
"mateStepper"?: "dormPreference" | "roommatePreference" | "selfProfile" | { "dormPreference"?: "Saving Dorm Preference" | "showing form";
"roommatePreference"?: "Saving Roommate Preference" | "showing form";
"selfProfile"?: "Saving Profile" | "showing form"; }; };
        tags: never;
      }
  