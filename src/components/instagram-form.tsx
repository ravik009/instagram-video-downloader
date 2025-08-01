"use client";

import React from "react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Download, Loader2, X, Link, Sparkles, AlertTriangle } from "lucide-react";

import { cn, getPostShortcode, isShortcodePresent } from "@/lib/utils";
import { useGetInstagramPostMutation } from "@/features/react-query/mutations/instagram";
import { HTTP_CODE_ENUM } from "@/features/api/http-codes";
import { DownloadPageAd } from "@/components/ads/enhanced-ads";

// 5 minutes
const CACHE_TIME = 5 * 60 * 1000;

const useFormSchema = () => {
  const t = useTranslations("components.instagramForm.inputs");

  return z.object({
    url: z
      .string({ required_error: t("url.validation.required") })
      .trim()
      .min(1, {
        message: t("url.validation.required"),
      })
      .startsWith("https://www.instagram.com", t("url.validation.invalid"))
      .refine(
        (value) => {
          return isShortcodePresent(value);
        },
        { message: t("url.validation.invalid") }
      ),
  });
};

function triggerDownload(videoUrl: string) {
  // Ensure we are in a browser environment
  if (typeof window === "undefined") return;

  // Construct the URL to your proxy API route
  const proxyUrl = new URL("/api/download-proxy", window.location.origin); // Use relative path + origin
  proxyUrl.searchParams.append("url", videoUrl);
  // Don't pass filename parameter - let backend extract from URL

  console.log("Using proxy URL:", proxyUrl.toString()); // For debugging

  const link = document.createElement("a");
  // Set href to your proxy route
  link.href = proxyUrl.toString();
  link.target = "_blank";

  // Don't set download attribute - let backend handle filename
  // link.setAttribute("download", filename);

  // Append link to the body temporarily
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Clean up and remove the link
  document.body.removeChild(link);
}

type CachedUrl = {
  videoUrl?: string;
  expiresAt: number;
  invalid?: {
    messageKey: string;
  };
};

export function InstagramForm(props: { className?: string }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const cachedUrls = React.useRef(new Map<string, CachedUrl>());

  const t = useTranslations("components.instagramForm");

  const {
    isError,
    isPending,
    mutateAsync: getInstagramPost,
  } = useGetInstagramPostMutation();

  const formSchema = useFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const errorMessage = form.formState.errors.url?.message;

  const isDisabled = isPending || !form.formState.isDirty;
  const isShowClearButton = form.watch("url").length > 0;

  function clearUrlField() {
    form.setValue("url", "");
    form.clearErrors("url");
    inputRef.current?.focus();
  }

  function setCachedUrl(
    shortcode: string,
    videoUrl?: string,
    invalid?: CachedUrl["invalid"]
  ) {
    cachedUrls.current?.set(shortcode, {
      videoUrl,
      expiresAt: Date.now() + CACHE_TIME,
      invalid,
    });
  }

  function getCachedUrl(shortcode: string) {
    const cachedUrl = cachedUrls.current?.get(shortcode);

    if (!cachedUrl) {
      return null;
    }

    if (cachedUrl.expiresAt < Date.now()) {
      cachedUrls.current.delete(shortcode);
      return null;
    }

    return cachedUrl;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isError) {
      toast.dismiss("toast-error");
    }

    const shortcode = getPostShortcode(values.url);

    if (!shortcode) {
      form.setError("url", { message: t("inputs.url.validation.invalid") });
      return;
    }

    const cachedUrl = getCachedUrl(shortcode);
    if (cachedUrl?.invalid) {
      form.setError("url", { message: t(cachedUrl.invalid.messageKey) });
      return;
    }

    if (cachedUrl?.videoUrl) {
      triggerDownload(cachedUrl.videoUrl);
      return;
    }

    try {
      const { data, status } = await getInstagramPost({ shortcode });

      if (status === HTTP_CODE_ENUM.OK) {
        const media = data.data.xdt_shortcode_media;
        let downloadUrl: string | null = null;

        if (media.is_video) {
          // Video post
          downloadUrl = media.video_url;
        } else {
          // Photo post
          downloadUrl = media.display_url;
        }

        if (downloadUrl) {
          triggerDownload(downloadUrl);
          setCachedUrl(shortcode, downloadUrl);
          toast.success(t("toasts.success"), {
            id: "toast-success",
            position: "top-center",
            duration: 1500,
          });
        } else {
          throw new Error("Media URL not found");
        }
      } else if (
        status === HTTP_CODE_ENUM.NOT_FOUND ||
        status === HTTP_CODE_ENUM.BAD_REQUEST ||
        status === HTTP_CODE_ENUM.TOO_MANY_REQUESTS ||
        status === HTTP_CODE_ENUM.INTERNAL_SERVER_ERROR
      ) {
        const errorMessageKey = `serverErrors.${data.error}`;
        form.setError("url", { message: t(errorMessageKey) });
        if (
          status === HTTP_CODE_ENUM.BAD_REQUEST ||
          status === HTTP_CODE_ENUM.NOT_FOUND
        ) {
          setCachedUrl(shortcode, undefined, {
            messageKey: errorMessageKey,
          });
        }
      } else {
        throw new Error("Failed to fetch media");
      }
    } catch (error) {
      console.error(error);
      toast.error(t("toasts.error"), {
        dismissible: true,
        id: "toast-error",
        position: "top-center",
      });
    }
  }

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={cn("w-full space-y-4", props.className)}>
      {/* Enhanced form container with glassmorphism effect */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-6 md:p-8">
        {/* Form header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Link className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Paste Instagram URL
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Download videos, photos, reels, and stories in high quality
          </p>
        </div>

        {errorMessage ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          </div>
        ) : (
          <div className="h-4"></div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="url"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sr-only">
                    {t("inputs.url.label")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        {...field}
                        type="url"
                        ref={inputRef}
                        minLength={1}
                        maxLength={255}
                        placeholder={t("inputs.url.placeholder")}
                        className="h-14 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-200 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                      />
                      {isShowClearButton && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={clearUrlField}
                          className="absolute top-1/2 right-3 h-8 w-8 -translate-y-1/2 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button
              disabled={isDisabled}
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <Download className="h-5 w-5 mr-2" />
              )}
              {isPending ? "Processing..." : t("submit")}
            </Button>
          </form>
        </Form>

        {/* Enhanced hint with icon */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <Sparkles className="h-3 w-3" />
            <span>{t("hint")}</span>
          </div>
          
          {/* Copyright Warning - Hidden */}
          {/* 
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-yellow-800 dark:text-yellow-200">
                <p className="font-medium mb-1">Copyright Notice:</p>
                <p>Only download content you own or have permission to use. Respect copyright laws and fair use guidelines. 
                <a href="/copyright-disclaimer" className="underline ml-1">Learn more</a></p>
              </div>
            </div>
          </div>
          */}
        </div>
      </div>

      {/* Download Page Ad */}
      <DownloadPageAd />
    </div>
  );
}
