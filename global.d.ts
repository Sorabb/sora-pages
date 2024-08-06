declare module '*.module.scss' {
    const classes: any;
    export default classes;
}
declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}