import { useAtomValue } from "jotai"
import { balanceAtom } from "../atoms/balance.js"

export const useBalance = () => {
    const value = useAtomValue(balanceAtom);
    return value;
}