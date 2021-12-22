import { Keys } from './keys';

enum KeyState {
    Up = 'Up',
    Down = 'Down',
    held = 'Held',
    released = 'Released',
}

export class Input {
    private upInputs = new Map<Keys, Keys>([]);
    private downInputs = new Map<Keys, Keys>([]);
    
    private inputs = new Map<Keys, KeyState>([]);

    public onKeyDown(key: Keys): void {
        this.downInputs.set(key, key);
    }

    public onKeyUp(key: Keys): void {
        this.upInputs.set(key, key);
        this.downInputs.delete(key);
    }

    public getKeyDown(key: Keys): boolean {
        const keyState = this.inputs.get(key);

        return Boolean(keyState) && keyState === KeyState.Down;
    }

    public getKeyHeld(key: Keys): boolean {
        const keyState = this.inputs.get(key);

        return Boolean(keyState) && keyState === KeyState.held;
    }

    public getKeyUp(key: Keys): boolean {
        const keyState = this.inputs.get(key);

        return Boolean(keyState) && keyState === KeyState.Up;
    }

    public onFrameStart(): void {
        this.downInputs.forEach((input) => {
            const lastKnownKeyState = this.inputs.get(input);

            if (!Boolean(lastKnownKeyState)) {
                this.inputs.set(input, KeyState.Down);
            } else {
                if (lastKnownKeyState === KeyState.Down) {
                    this.inputs.set(input, KeyState.held);
                }

                if (lastKnownKeyState === KeyState.released) {
                    this.inputs.set(input, KeyState.Down);
                }
            }
        });

        this.upInputs.forEach((input) => {
            this.inputs.set(input, KeyState.Up);
        });
    }

    public onFrameEnd(): void {
        this.inputs.forEach((keyState, key) => {
            if (keyState === KeyState.Up) {
                this.inputs.set(key, KeyState.released);
            }
        });

        this.upInputs.clear();
    }
}