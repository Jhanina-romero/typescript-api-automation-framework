declare module 'allure-jest' {
  export const allure: {
    epic(name: string): void;
    feature(name: string): void;
    story(name: string): void;
    severity(level: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'): void;
    step<T>(name: string, body: () => Promise<T> | T): Promise<T> | T;
  };
}
