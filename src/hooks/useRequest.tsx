import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useState } from "react";
import http from "@/lib/http";
import { AxiosRequestConfig, AxiosProgressEvent } from "axios";
import { message } from "antd";

type RequestType = "post" | "put" | "delete" | "patch";
type ContentType = "application/json" | "multipart/form-data" | "blob";

interface Error {
    response: {
        data: { [key: string]: string };
    };
}
interface MutationVariables {
    method: RequestType;
    url: string;
    data: unknown;
    customContentType?: ContentType;
}

type UseRequestOptions<T> = Omit<
    UseMutationOptions<T, Error, MutationVariables, unknown>,
    "mutationFn"
>;

interface UseRequestConfig {
    contentType?: ContentType;
}

export function useRequest<T = unknown>(
    options?: UseRequestOptions<T>,
    config: UseRequestConfig = {}
) {
    const { contentType = "application/json" } = config;
    const [uploadProgress, setUploadProgress] = useState(0);
    const mutationFn = async ({
        method,
        url,
        data,
        customContentType,
    }: MutationVariables & { customContentType?: ContentType }): Promise<T> => {
        const axiosConfig: AxiosRequestConfig = {
            url,
            method,
            data: data || {},
            headers: {
                "Content-Type": customContentType || contentType,
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                if (progressEvent.total) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                }
            },
        };

        const response = await http(axiosConfig);
        return response.data as T;
    };

    const mutation = useMutation<T, Error, MutationVariables>({
        mutationFn,
        mutationKey: options?.mutationKey,
        ...options,
        onSettled(_, error) {
            if (error) {
                message.error(`${error?.response?.data}` || "Произошла ошибка");
            }
        },
    });

    const handleRequest = async (
        method: RequestType,
        url: string,
        data?: unknown,
        requestOptions?: { contentType?: ContentType; isConfirmed?: boolean }
    ) => {
        if (
            typeof requestOptions?.isConfirmed === "undefined" ||
            !!requestOptions?.isConfirmed
        ) {
            return mutation.mutateAsync({
                method,
                url,
                data,
                customContentType: requestOptions?.contentType,
            });
        }
    };

    const post = (
        url: string,
        data?: unknown,
        options?: { contentType?: ContentType; isConfirmed?: boolean }
    ) => handleRequest("post", url, data, options);

    const put = (
        url: string,
        data?: unknown,
        options?: { contentType?: ContentType; isConfirmed?: boolean }
    ) => handleRequest("put", url, data, options);

    const patch = (
        url: string,
        data?: unknown,
        options?: { contentType?: ContentType; isConfirmed?: boolean }
    ) => handleRequest("patch", url, data, options);

    const remove = (
        url: string,
        data?: unknown,
        options?: { contentType?: ContentType; isConfirmed?: boolean }
    ) => handleRequest("delete", url, data, options);

    return {
        ...mutation,
        post,
        put,
        patch,
        remove,
        uploadProgress,
    };
}
