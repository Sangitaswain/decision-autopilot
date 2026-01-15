import { motion } from "framer-motion";

export default function ConfidenceMeter({ value = 0.72 }: { value?: number }) {
    return (
        <div className="flex items-center gap-3 border-l-2 border-amber-500 pl-6 py-1 -ml-[26px]">

            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-mono leading-none">
                        System state
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-400 font-mono">
                        Evaluating decision — confidence stabilizing at <span className="text-amber-500 font-bold">{(value * 100).toFixed(0)}%</span>
                    </span>
                </div>
            </div>

        </div>
    );
}
