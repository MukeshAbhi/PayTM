import { Button } from "@repo/ui/components/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/components/input-otp"
import { useSession } from "next-auth/react"
import { useState } from "react"

export const WalletPin = () => {
    const { data: session } = useSession()
    const userId = session?.user?.id;
    const [isPinPresent, setIsPinPresent] = useState<boolean>(true);

   return(
        isPinPresent  ? <ChangeWalletPin /> : <SetWalletPin/> 
   )
}

const SetWalletPin = () => {
     const [value, setValue] = useState("")

    return(
        <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 sm:px-8 md:px-12 lg:px-16">
            <div className="text-foreground text-xl sm:text-2xl md:text-3xl font-semibold text-center">
                Set Wallet PIN
            </div>

            <div className="w-full max-w-md">
                <div className="space-y-4">
                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => setValue(value)}
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
                    {value === "" ? (
                    <>Enter your Wallet PIN.</>
                    ) : (
                    <>You entered: {value}</>
                    )}
                </div>

                <Button className="text-white w-20 ml-40">Set</Button>
                </div>
            </div>
        </div>

    )
}

const ChangeWalletPin = () => {
    const [value, setValue] = useState("")

    return(
        <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 sm:px-8 md:px-12 lg:px-16">
            <div className="text-foreground text-xl sm:text-2xl md:text-3xl font-semibold text-center">
                Chnage Wallet PIN
            </div>

            <div className="w-full max-w-md">
                <div className="space-y-4">
                    <div className="flex justify-center  gap-2 sm:gap-3">Old Wallet Pin</div>
                    <InputOTP
                        maxLength={6}
                        value={value}
                        onChange={(value) => setValue(value)}
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
                    <div className="flex justify-center  gap-2 sm:gap-3">New Wallet Pin</div>
                    <InputOTP
                        maxLength={6}
                        value={value}
                        onChange={(value) => setValue(value)}
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
                        {value === "" ? (
                        <>Enter your Wallet PIN.</>
                        ) : (
                        <>You entered: {value}</>
                        )}
                    </div>

                    <Button className="text-white w-20 ml-40">Set</Button>
                    <div className="text-center">Forgot Wallet Pin..?</div>
                </div>
            </div>
        </div>

    )
}