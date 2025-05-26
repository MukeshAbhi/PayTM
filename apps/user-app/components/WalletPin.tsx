import { Button } from "@repo/ui/components/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/components/input-otp"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"



export const WalletPin = () => {
    const { data: session } = useSession()
    const userId = session?.user?.id;
    const [isPinPresent, setIsPinPresent] = useState<boolean>(false);

   return(
        isPinPresent  ? <ChangeWalletPin /> : <SetWalletPin/> 
   )
}

const SetWalletPin = () => {
    type FormData = {
        pin: string;
    };
    const { handleSubmit, watch, control, formState:{ errors} } = useForm<FormData>({mode: "onChange"});

    const pinValue = watch("pin");
        
    const onSubmit = (data: FormData) => {
        console.log("Submitted OTP:", data.pin);
    };

    return(
        <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 sm:px-8 md:px-12 lg:px-16">
            <div className="text-foreground text-xl sm:text-2xl md:text-3xl font-semibold text-center">
                Set Wallet PIN
            </div>

            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Controller 
                        name="pin"
                        control={control}
                        rules={{
                            required: 'Current PIN is required',
                            minLength: { value: 6, message: "Must be 6 Digits"}
                        }}
                        render={({ field }) => (
                            <InputOTP
                                maxLength={6}
                                value={field.value || ""}
                                onChange={(value) => field.onChange(value)}
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
                        )}
                    />

                    <div className="text-center text-sm sm:text-base text-muted-foreground">
                        {pinValue === "" ? (
                        <>Enter your Wallet PIN.</>
                        ) : (
                        <>You entered: {pinValue}</>
                        )}
                    </div>

                    {errors.pin && (
                        <p className="text-red-500 text-sm text-center">{errors.pin.message}</p>
                    )}
                    <div className="ml-5">
                        <Button className="text-white w-20 ml-40 ">Set</Button>
                    </div>
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
    const { handleSubmit, watch, control, formState:{ errors} } = useForm<FormData>({mode: "onChange"});

    const currentPin = watch("currentPin");
    const newPin = watch("newPin");

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
                    <div className="flex justify-center  gap-2 sm:gap-3">
                        Current Wallet Pin
                    </div>
                    <Controller 
                        name="currentPin"
                        control={control}
                        rules={{
                            required: 'Current PIN is required',
                            minLength: { value: 6, message: "Must be 6 Digits"}
                        }}
                        render={({ field }) => (
                            <InputOTP
                                maxLength={6}
                                value={field.value || ""}
                                onChange={(value) => field.onChange(value)}
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
                        )}
                    />
            
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

                    <div className="flex justify-center  gap-2 sm:gap-3">
                        New Wallet Pin
                    </div>
                    <Controller 
                        name="newPin"
                        control={control}
                        rules={{
                            required: 'New PIN is required',
                            minLength: { value: 6, message: "Must be 6 Digits"}
                        }}
                        render={({ field }) => (
                            <InputOTP
                                maxLength={6}
                                value={field.value || ""}
                                onChange={(value) => field.onChange(value)}
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
                        )}
                    />

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