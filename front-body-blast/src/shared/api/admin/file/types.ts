//TODO: extends AppBaseEntity
export interface FileEntity {
  fileName: string;
  path: string;
  fileLink: string;
}

export namespace AdminFile {
  export namespace Post {
    export interface Dto {
      file: File;
    }
    export interface Response {
      link: string;
    }
  }
  export namespace Get {
    //TODO: pagination
    export interface Dto {
      page: number;
      limit: number;
      expanded: boolean;
    }

    export interface Response {
      data: Array<FileEntity>;
      count: number;
    }
  }

  export namespace GetByName {
    export interface Dto {
      filename: string;
    }
    export interface Response extends File {}
  }
}
