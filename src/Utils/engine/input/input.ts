enum KeyState {
    Up,
    Down,
}

export class Input {
    inputs: Map<string, KeyState>;

    public onKeyDown(key: string): void {
        this.inputs.set(key, KeyState.Down);
    }

    public onKeyUp(key: string): void {
        this.inputs.set(key, KeyState.Up);
    }

    public getKeyDown(key: string): boolean {
        const keyState = this.inputs.get(key);

        return Boolean(keyState) && keyState === KeyState.Down;
    }

    public getKeyUp(key: string): boolean {
        const keyState = this.inputs.get(key);

        return Boolean(keyState) && keyState === KeyState.Up;
    }
}