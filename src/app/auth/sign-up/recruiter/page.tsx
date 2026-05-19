"use client";
import RolePillsPhysics from "@/components/animations/role-pills-physics";

import React from "react";
import RecruterForm from "../../_shared/recruter-form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  basicSigupSchema,
  basicSigupType,
} from "@/schema/recruter-onboarding-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function RecruiterSignup() {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { control, handleSubmit } = useForm<basicSigupType>({
    resolver: zodResolver(basicSigupSchema),
    defaultValues: {
      fullName: "",
      password: "",
      phoneNumber: "",
      recruiterType: "INHOUSE",
      work_email: "",
    },
    mode: "onChange",
  });

  const handleOnSubmit = async (data: basicSigupType) => {
    setLoading(true);
    try {
      const res = await api.post("/users/signup", {
        ...data,
        userRole: "RECRUITER",
        user_name: data.fullName,
        email: data.work_email,
      });
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      const result = await signIn("credentials", {
        email: data.work_email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/recruiter/onboarding");
        router.refresh();
      }
      toast.success(res.message);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="block w-full md:flex min-h-screen">
      <div className="w-1/2 hidden lg:flex items-center justify-center p-12">
        <RolePillsPhysics />
      </div>

      <div className="w-full lg:w-1/2 bg-muted/20 p-0 md:py-12 md:px-4 lg:p-8 overflow-y-auto">
        <div className="h-full items-center md:flex px-4">
          <form
            noValidate
            onSubmit={handleSubmit(handleOnSubmit)}
            className="w-full md:max-w-full max-w-sm  space-y-7"
          >
            <RecruterForm control={control} />
            <Button
              disabled={loading}
              type="submit"
              className="w-full"
              size={"lg"}
              variant={"outline"}
            >
              {loading ? <Loader className="animate-spin size-4" /> : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
