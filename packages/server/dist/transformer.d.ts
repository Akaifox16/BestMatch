import * as superjson_dist_custom_transformer_registry from 'superjson/dist/custom-transformer-registry';
import * as superjson_dist_class_registry from 'superjson/dist/class-registry';
import * as superjson_dist_types from 'superjson/dist/types';

declare const transformer: {
    stringify: (object: any) => string;
    parse: <T = unknown>(string: string) => T;
    serialize: (object: any) => superjson_dist_types.SuperJSONResult;
    deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
    registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
    registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
    registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
    allowErrorProps: (...props: string[]) => void;
};

export { transformer };
