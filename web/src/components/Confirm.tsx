import { Button } from "./Globals";

export default function ({ children, onConfirm, onCancel }: any) {
    return (
        <section className="flex flex-row gap-1">
            <Button onClick={onConfirm}>Yes</Button>
            <Button onClick={onCancel}>No</Button>
        </section>
    )
}