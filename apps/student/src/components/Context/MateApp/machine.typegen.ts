
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.regenerate_profile": { type: "done.invoke.regenerate_profile"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.regenerate_profile": { type: "error.platform.regenerate_profile"; data: unknown };
"xstate.after(1000)#mate_app_machine.finetuner.generate errored": { type: "xstate.after(1000)#mate_app_machine.finetuner.generate errored" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "regenerateProfile": "done.invoke.regenerate_profile";
        };
        missingImplementations: {
          actions: "clearErrorCount" | "decrementStep" | "incrementErrorCount" | "incrementStep" | "pickProfile" | "updateGeneratedProfile";
          delays: never;
          guards: "isInitialize" | "notExceedErrorLimitCount";
          services: "regenerateProfile";
        };
        eventsCausingActions: {
          "clearErrorCount": "done.invoke.regenerate_profile";
"decrementStep": "PREV";
"incrementErrorCount": "error.platform.regenerate_profile";
"incrementStep": "NEXT";
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
          "regenerateProfile": "" | "PICKED" | "done.state.mate_app_machine.mateStepper" | "xstate.after(1000)#mate_app_machine.finetuner.generate errored";
        };
        matchesStates: "finetuner" | "finetuner.error limit exceeded" | "finetuner.generate errored" | "finetuner.loading" | "finetuner.show" | "mateStepper" | "mateStepper.dormPreference" | "mateStepper.roommatePreference" | "mateStepper.selfProfile" | "mateStepper.submitted" | "unknown" | { "finetuner"?: "error limit exceeded" | "generate errored" | "loading" | "show";
"mateStepper"?: "dormPreference" | "roommatePreference" | "selfProfile" | "submitted"; };
        tags: never;
      }
  