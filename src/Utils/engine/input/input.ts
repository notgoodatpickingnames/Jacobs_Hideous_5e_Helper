import { LastPageOutlined } from '@mui/icons-material';
import { keys } from '@mui/system';

enum KeyState {
    Up = 'Up',
    Down = 'Down',
    held = 'Held',
    released = 'Released',
}

export class Input {
    private upInputs = new Map<string, string>([]);
    private downInputs = new Map<string, string>([]);
    
    private inputs = new Map<string, KeyState>([]);

    public onKeyDown(key: string): void {
        this.downInputs.set(key.toLocaleLowerCase(), key.toLocaleLowerCase());
    }

    public onKeyUp(key: string): void {
        this.upInputs.set(key.toLocaleLowerCase(), key.toLocaleLowerCase());
        this.downInputs.delete(key.toLocaleLowerCase());
    }

    public getKeyDown(key: string): boolean {
        const keyState = this.inputs.get(key.toLocaleLowerCase());

        return Boolean(keyState) && keyState === KeyState.Down;
    }

    public getKeyHeld(key: string): boolean {
        const keyState = this.inputs.get(key.toLocaleLowerCase());

        return Boolean(keyState) && keyState === KeyState.held;
    }

    public getKeyUp(key: string): boolean {
        const keyState = this.inputs.get(key.toLocaleLowerCase());

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
                this.inputs.set(key.toLocaleLowerCase(), KeyState.released);
            }
        });

        this.upInputs.clear();
    }
}