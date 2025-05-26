import { Button } from "@repo/ui/components/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/components/input-otp"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"



export const WalletPin = () => {
    const { data: session } = useSession()
    const userId = session?.user?.id;
    const [isPinPresent, setIsPinPresent] = useState<boolean>(true);

   return(
        isPinPresent  ? <ChangeWalletPin /> : <SetWalletPin/> 
   )
}

const SetWalletPin = () => {
    type FormData = {
        otp: string;
    };
    const {register, handleSubmit, setValue, watch, formState:{ errors}} = useForm<FormData>();

    const otpValue = watch("otp");

    useEffect(() => {
        register("otp", {
            required: "OTP is required",
            minLength: {
            value: 6,
            message: "OTP must be 6 digits",
            },
        });
    }, [register]);

    const onSubmit = (data: FormData) => {
        console.log("Submitted OTP:", data.otp);
    };

    return(
        <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 sm:px-8 md:px-12 lg:px-16">
            <div className="text-foreground text-xl sm:text-2xl md:text-3xl font-semibold text-center">
                Set Wallet PIN
            </div>

            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <InputOTP
                        maxLength={6}
                        value={otpValue}
                        onChange={(value) => setValue("otp", value)}
                    >
                        <InputOTPGroup className="flex justify-center pl-20 gap-2 sm:gap-3">
                        <InputOTPSlot index={0}  />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>

                    <div className="text-center text-sm sm:text-base text-muted-foreground">
                        {otpValue === "" ? (
                        <>Enter your Wallet PIN.</>
                        ) : (
                        <>You entered: {otpValue}</>
                        )}
                    </div>
                        {errors.otp && (
                            <p className="text-red-500 text-sm">{errors.otp.message}</p>
                        )}
                    <Button className="text-white w-20 ml-40">Set</Button>
                </form>
            </div>
        </div>

    )
}

const ChangeWalletPin = () => {
    type FormData = {
        currentPin: string;
        newPin: string;
    };
    const {register, handleSubmit, setValue, watch, formState:{ errors}} = useForm<FormData>({mode: "onChange"});

    const currentPin = watch("currentPin");
    const newPin = watch("newPin");

    useEffect(() => {
        register("currentPin", {
            required: "Current PIN is required",
            minLength: { value: 6, message: "Must be 6 digits" },
        });
        register("newPin", {
            required: "New PIN is required",
            minLength: { value: 6, message: "Must be 6 digits" },
        });
    }, [register]);

    const onSubmit = (data: FormData) => {
        console.log("Changing PIN with values:", data);
    };

    return(
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-6 px-4 py-8 sm:px-8 md:px-12 lg:px-16"
        >
            <div className="text-foreground text-xl sm:text-2xl md:text-3xl font-semibold text-center">
                Chnage Wallet PIN
            </div>

            <div className="w-full max-w-md">
                <div className="space-y-4">
                    <div className="flex justify-center  gap-2 sm:gap-3">Current Wallet Pin</div>
                    <InputOTP
                        maxLength={6}
                        value={currentPin}
                        onChange={(value) => setValue("currentPin", value)}
                    >
                        <InputOTPGroup className="flex justify-center pl-20 gap-2 sm:gap-3">
                        <InputOTPSlot index={0}  />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <div className="text-center text-sm sm:text-base text-muted-foreground">
                        {currentPin === "" ? (
                        <>Enter your Wallet PIN.</>
                        ) : (
                        <>You entered: {currentPin}</>
                        )}
                    </div>
                    {errors.currentPin && (
                        <p className="text-red-500 text-sm text-center">{errors.currentPin.message}</p>
                    )}
                    <div className="flex justify-center  gap-2 sm:gap-3">New Wallet Pin</div>
                    <InputOTP
                        maxLength={6}
                        value={newPin}
                        onChange={(value) => setValue("newPin", value)}
                    >
                        <InputOTPGroup className="flex justify-center pl-20 gap-2 sm:gap-3">
                        <InputOTPSlot index={0}  />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>

                    <div className="text-center text-sm sm:text-base text-muted-foreground">
                        {newPin === "" ? (
                        <>Enter your Wallet PIN.</>
                        ) : (
                        <>You entered: {newPin}</>
                        )}
                    </div>
                    {errors.newPin && (
                        <p className="text-red-500 text-sm text-center">{errors.newPin.message}</p>
                    )}
                    <Button className="text-white w-20 ml-40">
                        Set
                    </Button>
                    <div className="text-center">Forgot Wallet Pin..?</div>
                </div>
            </div>
        </form>

    )
}