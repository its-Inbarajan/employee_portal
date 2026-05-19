"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import CompanyDetailsForm from "./_shared/company-details-form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companyOnboardingDetails,
  companySocialMedia,
  companySocialMediaValue,
  inviteRecruitersSchema,
  inviteRecruitersValue,
  type onboardingDetailsValue,
} from "@/schema/recruter-onboarding-schema";
import CompanySocialDetailsForm from "./_shared/company-social-details-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import InviteRecruitersForm from "./_shared/invite-recruiters-form";
import { Badge } from "@/components/ui/badge";
import { useApiMutation } from "@/lib/api/use-query";
import { handleApiError } from "@/lib/api/use-api-error";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
export default function OnboardingRecruiter() {
  const TOTAL_STEPS = 3 as const;
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const { control: DetailsControl, handleSubmit } =
    useForm<onboardingDetailsValue>({
      resolver: zodResolver(companyOnboardingDetails),
      defaultValues: {
        company_about: "",
        company_email: "",
        company_industry: "",
        company_location: "",
        company_logo: undefined,
        company_name: "",
        company_size: "",
        company_website: "",
      },
      mode: "onChange",
    });
  const {
    control: socialDetailsControl,
    register,
    formState: { errors },
    handleSubmit: onSubmitSocialDetails,
  } = useForm<companySocialMediaValue>({
    resolver: zodResolver(companySocialMedia),
    defaultValues: {
      linkedin: "",
      social_medias: [
        {
          url: "",
        },
      ],
    },
    mode: "onChange",
  });

  const { control: InviteControl, handleSubmit: InvitationSubmit } =
    useForm<inviteRecruitersValue>({
      resolver: zodResolver(inviteRecruitersSchema),
      defaultValues: {
        invitation: [
          {
            email: "",
            role: "RECRUITER",
          },
        ],
      },
      mode: "onChange",
    });

  const currentStep = Math.min(
    Math.max(Number(searchParams.get("step") ?? "1"), 1),
    TOTAL_STEPS,
  );

  const goToStep = (step: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("step", String(step));
    router.push(`${pathName}?${params.toString()}`);
  };

  const handleNext = () => {
    if (currentStep >= TOTAL_STEPS) return;
    goToStep(currentStep + 1);
  };

  const handleStepBack = () => {
    if (currentStep <= 1) return;
    goToStep(currentStep - 1);
  };

  const routerSteps = searchParams.get("step") ?? null;

  const { mutate, isPending: basicFormIsPending } = useApiMutation<
    {
      message: string;
      statuscode: number;
      success: boolean;
    },
    onboardingDetailsValue
  >(`/company/onboarding`, "POST", {
    onSuccess: (res) => {
      if (res.success) {
        handleNext();
      }
    },
    onError: (err) => {
      toast.error(handleApiError(err));
      console.log(handleApiError(err));
    },
  });

  const SocialDetailsMutation = useApiMutation<
    {
      message: string;
      statuscode: number;
      success: boolean;
    },
    companySocialMediaValue
  >("/company/onboarding/social", "PATCH", {
    onSuccess: (res) => {
      if (res.success) {
        handleNext();
        toast.success(res.data?.message);
      }
    },
    onError: (err) => {
      toast.error(handleApiError(err));
      console.log(handleApiError(err));
    },
  });
  const InviteCompanyRecuriterMutation = useApiMutation<
    {
      message: string;
      statuscode: number;
      success: boolean;
    },
    inviteRecruitersValue
  >("/company/invite", "POST", {
    onSuccess: (res) => {
      if (res.success) {
        router.push("/recruiter");
        toast.success(res.data?.message);
      }
    },
    onError: (err) => {
      toast.error(handleApiError(err));
      console.log(handleApiError(err));
    },
  });

  const onSubmitBasicCompanyInfo = (data: onboardingDetailsValue) => {
    mutate(data);
  };
  const onSubmitSocialCompanyInfo = (data: companySocialMediaValue) => {
    SocialDetailsMutation.mutate(data);
  };
  const onSubmitInvitation = (data: inviteRecruitersValue) => {
    InviteCompanyRecuriterMutation.mutate(data);
  };
  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="max-w-5xl w-full mx-auto px-10 py-5">
        {currentStep === 1 && (
          <form noValidate onSubmit={handleSubmit(onSubmitBasicCompanyInfo)}>
            <Card className="w-full pb-0 relative z-10">
              <CardHeader className="text-center">
                <CardTitle>Setup your Company Workspace.</CardTitle>
                <CardDescription>
                  Let&apos;s setup you company profile and let&apos;s gets start
                  job posting.
                </CardDescription>
                <CardAction>
                  <Badge variant={"outline"}>Step 1</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <CompanyDetailsForm control={DetailsControl} />
              </CardContent>
              <CardFooter className="flex rounded-b-2xl justify-end gap-2 items-center border-t bg-muted/50 px-6 pb-4">
                <Button
                  // onClick={handleNext}
                  type="submit"
                  variant={"default"}
                  size={"sm"}
                  disabled={basicFormIsPending}
                >
                  {basicFormIsPending && (
                    <Loader2 className="size-5 animate-spin" />
                  )}
                  Next
                </Button>
              </CardFooter>
            </Card>
          </form>
        )}

        {currentStep === 2 && (
          <form
            noValidate
            className="w-full space-y-3 py-12"
            onSubmit={onSubmitSocialDetails(onSubmitSocialCompanyInfo)}
          >
            <Card className="w-full max-w-lg mx-auto pb-0 relative z-10">
              <CardHeader>
                <CardTitle>Social Profiles</CardTitle>
                <CardDescription>
                  Please make sure all the urls start with https
                </CardDescription>

                <CardAction>
                  <Badge variant={"outline"}>Step 2</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <CompanySocialDetailsForm
                  errors={errors}
                  register={register}
                  control={socialDetailsControl}
                />
              </CardContent>
              <CardFooter className="flex rounded-b-2xl gap-2 items-center border-t bg-muted/50 px-6 pb-4">
                <div className="flex items-center justify-end gap-2.5 w-full">
                  <Button
                    type="button"
                    onClick={handleStepBack}
                    variant={"secondary"}
                    size={"sm"}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={SocialDetailsMutation.isPending}
                    type="submit"
                    variant={"default"}
                    size={"sm"}
                  >
                    {SocialDetailsMutation.isPending && (
                      <Loader2 className="size-5 animate-spin" />
                    )}{" "}
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        )}

        {currentStep === 3 && (
          <form noValidate onSubmit={InvitationSubmit(onSubmitInvitation)}>
            <Card className="max-w-3xl mx-auto w-full pb-0 relative z-10">
              <CardHeader>
                <CardTitle className="font-bold text-2xl leading-6">
                  Invite you team
                </CardTitle>
                <CardDescription>
                  Build your dream team faster. Invite your colleagues to
                  collaborate on hiring, review resumes, and leave feedback
                  together in one place.
                </CardDescription>
                <CardAction>
                  <Badge variant={"outline"}>Step 3</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <InviteRecruitersForm control={InviteControl} />
              </CardContent>
              <CardFooter className="flex rounded-b-2xl gap-2 items-center border-t bg-muted/50 px-6 pb-4">
                <div className="flex items-center justify-end gap-2.5 w-full">
                  <Button
                    type="button"
                    onClick={handleStepBack}
                    variant={"secondary"}
                    size={"sm"}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => router.push("/recruiter")}
                    variant={"outline"}
                    size={"sm"}
                    type="button"
                  >
                    Skip
                  </Button>
                  <Button
                    disabled={InviteCompanyRecuriterMutation.isPending}
                    type="submit"
                    variant={"default"}
                    size={"sm"}
                  >
                    {InviteCompanyRecuriterMutation.isPending && (
                      <Loader2 className="size-5 animate-spin" />
                    )}{" "}
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        )}
      </div>

      {routerSteps === null && (
        <AlertDialog open={routerSteps === null ? true : false}>
          <AlertDialogContent className="p-0 backdrop-blur-3xl">
            <AlertDialogHeader className="px-6 py-4">
              <AlertDialogTitle>
                Let&apos;s Complete the company onboadring
              </AlertDialogTitle>
              <AlertDialogDescription>
                Complete your profile to unlock all recruitment tools. Add your
                company details, brand your careers page to start attracting top
                talent today.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <ul className="flex flex-col items-start gap-5 ml-4 list-none px-10">
              {[
                "Company Basic Details",
                "Social Profiles",
                "Invite Your Teams",
              ].map((item) => (
                <li
                  className="list-decimal text-sm font-medium"
                  key={`steps-${item}`}
                >
                  {item}
                </li>
              ))}
            </ul>
            <AlertDialogFooter className="flex rounded-b-lg gap-2 items-center border-t bg-muted/50 px-6 py-4">
              {/* <AlertDialogAction variant={"outline"} size={"sm"}>
                Skip
              </AlertDialogAction> */}

              <AlertDialogAction size={"sm"} onClick={() => goToStep(1)}>
                Let&apos;s do
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </section>
  );
}
