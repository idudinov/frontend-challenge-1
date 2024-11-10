export namespace Routes {
  export const Home = "/";
  export const Process = "/process";
  export const List = "/list";

  export function ViewFile(id: string) {
    return `/list/${id}`;
  }
  export namespace ViewFile {
    export const Template = ViewFile(":id");
  }
}
