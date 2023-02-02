import * as superjson_dist_custom_transformer_registry from 'superjson/dist/custom-transformer-registry';
import * as superjson_dist_class_registry from 'superjson/dist/class-registry';
import * as superjson_dist_types from 'superjson/dist/types';
import * as _trpc_server from '@trpc/server';
import * as _prisma_client from '.prisma/client';
import * as next_auth from 'next-auth';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { Session } from '@bm/auth';

declare const appRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
    ctx: {
        session: next_auth.Session | null;
        prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
    };
    meta: object;
    errorShape: _trpc_server.DefaultErrorShape;
    transformer: {
        stringify: (object: any) => string;
        parse: <T = unknown>(string: string) => T;
        serialize: (object: any) => superjson_dist_types.SuperJSONResult;
        deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
        registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
        registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
        registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
        allowErrorProps: (...props: string[]) => void;
    };
}>, {
    auth: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            session: next_auth.Session | null;
            prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: {
            stringify: (object: any) => string;
            parse: <T = unknown>(string: string) => T;
            serialize: (object: any) => superjson_dist_types.SuperJSONResult;
            deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
            registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
            registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
            registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
            allowErrorProps: (...props: string[]) => void;
        };
    }>, {
        login: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: next_auth.Session | null;
                    prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    stringify: (object: any) => string;
                    parse: <T = unknown>(string: string) => T;
                    serialize: (object: any) => superjson_dist_types.SuperJSONResult;
                    deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
                    registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
                    registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
                    registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
                    allowErrorProps: (...props: string[]) => void;
                };
            }>;
            _meta: object;
            _ctx_out: {
                session: next_auth.Session | null;
                prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
            };
            _input_in: {
                email: string;
                password: string;
            };
            _input_out: {
                email: string;
                password: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            email: string;
            name: string;
            id: string;
        } | null>;
        register: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: next_auth.Session | null;
                    prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    stringify: (object: any) => string;
                    parse: <T = unknown>(string: string) => T;
                    serialize: (object: any) => superjson_dist_types.SuperJSONResult;
                    deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
                    registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
                    registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
                    registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
                    allowErrorProps: (...props: string[]) => void;
                };
            }>;
            _meta: object;
            _ctx_out: {
                session: next_auth.Session | null;
                prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
            };
            _input_in: {
                email: string;
                password: string;
                first_name: string;
                last_name: string;
                confirm_password: string;
                personal_id: string;
                sex: "MALE" | "FEMALE";
            };
            _input_out: {
                email: string;
                password: string;
                first_name: string;
                last_name: string;
                confirm_password: string;
                personal_id: string;
                sex: "MALE" | "FEMALE";
            };
            _output_in: {
                id: string;
                name: string;
                email: string;
            };
            _output_out: {
                id: string;
                name: string;
                email: string;
            };
        }, unknown>;
    }>;
    student: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            session: next_auth.Session | null;
            prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: {
            stringify: (object: any) => string;
            parse: <T = unknown>(string: string) => T;
            serialize: (object: any) => superjson_dist_types.SuperJSONResult;
            deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
            registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
            registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
            registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
            allowErrorProps: (...props: string[]) => void;
        };
    }>, {
        getProfile: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: next_auth.Session | null;
                    prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    stringify: (object: any) => string;
                    parse: <T = unknown>(string: string) => T;
                    serialize: (object: any) => superjson_dist_types.SuperJSONResult;
                    deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
                    registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
                    registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
                    registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
                    allowErrorProps: (...props: string[]) => void;
                };
            }>;
            _meta: object;
            _ctx_out: {
                session: next_auth.Session | null;
                prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            email: string;
            first_name: string;
            last_name: string;
            personal_id: string;
            sex: _prisma_client.Sex;
        } | null>;
        getRole: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: next_auth.Session | null;
                    prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    stringify: (object: any) => string;
                    parse: <T = unknown>(string: string) => T;
                    serialize: (object: any) => superjson_dist_types.SuperJSONResult;
                    deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
                    registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
                    registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
                    registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
                    allowErrorProps: (...props: string[]) => void;
                };
            }>;
            _meta: object;
            _ctx_out: {
                session: next_auth.Session | null;
                prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            message: string;
        }>;
        upsertProfile: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: next_auth.Session | null;
                    prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    stringify: (object: any) => string;
                    parse: <T = unknown>(string: string) => T;
                    serialize: (object: any) => superjson_dist_types.SuperJSONResult;
                    deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
                    registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
                    registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
                    registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
                    allowErrorProps: (...props: string[]) => void;
                };
            }>;
            _meta: object;
            _ctx_out: _trpc_server.Overwrite<{
                session: next_auth.Session | null;
                prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
            }, {
                session: {
                    user: {
                        id: string;
                    } & {
                        name?: string | null | undefined;
                        email?: string | null | undefined;
                        image?: string | null | undefined;
                    };
                    expires: string;
                };
            }>;
            _input_in: {
                messiness: number;
                loudness: number;
                do_not_disturb: {
                    start: number;
                    stop: number;
                }[];
            };
            _input_out: {
                messiness: number;
                loudness: number;
                do_not_disturb: {
                    start: number;
                    stop: number;
                }[];
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            status: string;
            msg: string;
        }>;
        upsertPreference: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: next_auth.Session | null;
                    prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    stringify: (object: any) => string;
                    parse: <T = unknown>(string: string) => T;
                    serialize: (object: any) => superjson_dist_types.SuperJSONResult;
                    deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
                    registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
                    registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
                    registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
                    allowErrorProps: (...props: string[]) => void;
                };
            }>;
            _meta: object;
            _ctx_out: _trpc_server.Overwrite<{
                session: next_auth.Session | null;
                prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
            }, {
                session: {
                    user: {
                        id: string;
                    } & {
                        name?: string | null | undefined;
                        email?: string | null | undefined;
                        image?: string | null | undefined;
                    };
                    expires: string;
                };
            }>;
            _input_in: {
                messiness: number;
                loudness: number;
                do_not_disturb: {
                    start: number;
                    stop: number;
                }[];
            };
            _input_out: {
                messiness: number;
                loudness: number;
                do_not_disturb: {
                    start: number;
                    stop: number;
                }[];
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            messiness: number;
            loudness: number;
            do_not_disturb: _prisma_client.DoNotDisturb[];
        }>;
        addDormPreference: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: next_auth.Session | null;
                    prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    stringify: (object: any) => string;
                    parse: <T = unknown>(string: string) => T;
                    serialize: (object: any) => superjson_dist_types.SuperJSONResult;
                    deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
                    registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
                    registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
                    registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
                    allowErrorProps: (...props: string[]) => void;
                };
            }>;
            _ctx_out: {
                session: next_auth.Session | null;
                prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, {
            message: string;
        }>;
        editDormPreference: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: next_auth.Session | null;
                    prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    stringify: (object: any) => string;
                    parse: <T = unknown>(string: string) => T;
                    serialize: (object: any) => superjson_dist_types.SuperJSONResult;
                    deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
                    registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
                    registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
                    registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
                    allowErrorProps: (...props: string[]) => void;
                };
            }>;
            _ctx_out: {
                session: next_auth.Session | null;
                prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, {
            message: string;
        }>;
        bookRoom: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: next_auth.Session | null;
                    prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    stringify: (object: any) => string;
                    parse: <T = unknown>(string: string) => T;
                    serialize: (object: any) => superjson_dist_types.SuperJSONResult;
                    deserialize: <T_1 = unknown>(payload: superjson_dist_types.SuperJSONResult) => T_1;
                    registerClass: (v: superjson_dist_types.Class, options?: string | superjson_dist_class_registry.RegisterOptions | undefined) => void;
                    registerSymbol: (v: Symbol, identifier?: string | undefined) => void;
                    registerCustom: <I, O extends superjson_dist_types.JSONValue>(transformer: Omit<superjson_dist_custom_transformer_registry.CustomTransfomer<I, O>, "name">, name: string) => void;
                    allowErrorProps: (...props: string[]) => void;
                };
            }>;
            _meta: object;
            _ctx_out: {
                session: next_auth.Session | null;
                prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
            };
            _input_in: {
                roomId: string;
            };
            _input_out: {
                roomId: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            message: string;
            room_no: number;
        }>;
    }>;
}>;
type AppRouter = typeof appRouter;

declare function createTRPCContext(opts: CreateNextContextOptions): Promise<{
    session: Session | null;
    prisma: _prisma_client.PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;
}>;

export { AppRouter, appRouter, createTRPCContext };
