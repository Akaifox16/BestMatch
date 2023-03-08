
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.mate_app_machine.finetuner.pick errored:invocation[0]": { type: "done.invoke.mate_app_machine.finetuner.pick errored:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.mate_app_machine.finetuner.pick profile:invocation[0]": { type: "done.invoke.mate_app_machine.finetuner.pick profile:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.mate_app_machine.finetuner.show:invocation[0]": { type: "done.invoke.mate_app_machine.finetuner.show:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.regenerate_profile": { type: "done.invoke.regenerate_profile"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.mate_app_machine.finetuner.pick profile:invocation[0]": { type: "error.platform.mate_app_machine.finetuner.pick profile:invocation[0]"; data: unknown };
"error.platform.mate_app_machine.finetuner.show:invocation[0]": { type: "error.platform.mate_app_machine.finetuner.show:invocation[0]"; data: unknown };
"error.platform.regenerate_profile": { type: "error.platform.regenerate_profile"; data: unknown };
"xstate.after(1000)#mate_app_machine.finetuner.generate errored": { type: "xstate.after(1000)#mate_app_machine.finetuner.generate errored" };
"xstate.after(1500)#mate_app_machine.finetuner.pick errored": { type: "xstate.after(1500)#mate_app_machine.finetuner.pick errored" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "pickProfile": "done.invoke.mate_app_machine.finetuner.pick errored:invocation[0]" | "done.invoke.mate_app_machine.finetuner.pick profile:invocation[0]" | "done.invoke.mate_app_machine.finetuner.show:invocation[0]";
"regenerateProfile": "done.invoke.regenerate_profile";
        };
        missingImplementations: {
          actions: "clearErrorCount" | "decrementStep" | "incrementErrorCount" | "incrementStep" | "submitForm" | "updateGeneratedProfile";
          delays: never;
          guards: "isInitialize" | "notExceedErrorLimitCount";
          services: "pickProfile" | "regenerateProfile";
        };
        eventsCausingActions: {
          "clearErrorCount": "done.invoke.mate_app_machine.finetuner.pick errored:invocation[0]" | "done.invoke.mate_app_machine.finetuner.pick profile:invocation[0]" | "done.invoke.regenerate_profile";
"decrementStep": "PREV";
"incrementErrorCount": "error.platform.mate_app_machine.finetuner.pick profile:invocation[0]" | "error.platform.regenerate_profile";
"incrementStep": "NEXT";
"submitForm": "SUBMIT";
"updateGeneratedProfile": "done.invoke.regenerate_profile";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "isInitialize": "";
"notExceedErrorLimitCount": "error.platform.mate_app_machine.finetuner.pick profile:invocation[0]" | "error.platform.regenerate_profile";
        };
        eventsCausingServices: {
          "pickProfile": "PICKED" | "done.invoke.regenerate_profile" | "error.platform.mate_app_machine.finetuner.pick profile:invocation[0]" | "error.platform.mate_app_machine.finetuner.show:invocation[0]" | "xstate.after(1500)#mate_app_machine.finetuner.pick errored";
"regenerateProfile": "" | "done.invoke.mate_app_machine.finetuner.pick errored:invocation[0]" | "done.invoke.mate_app_machine.finetuner.pick profile:invocation[0]" | "done.invoke.mate_app_machine.finetuner.show:invocation[0]" | "done.state.mate_app_machine.mateStepper" | "xstate.after(1000)#mate_app_machine.finetuner.generate errored";
        };
        matchesStates: "finetuner" | "finetuner.error limit exceeded" | "finetuner.generate errored" | "finetuner.loading" | "finetuner.pick errored" | "finetuner.pick profile" | "finetuner.show" | "mateStepper" | "mateStepper.dormPreference" | "mateStepper.roommatePreference" | "mateStepper.selfProfile" | "mateStepper.submitting" | "unknown" | { "finetuner"?: "error limit exceeded" | "generate errored" | "loading" | "pick errored" | "pick profile" | "show";
"mateStepper"?: "dormPreference" | "roommatePreference" | "selfProfile" | "submitting"; };
        tags: never;
      }
  