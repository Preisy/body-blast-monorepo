import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';

export interface FileEntity extends AppBaseEntity {
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
    export interface Dto extends AppPagination.BaseDto {}

    export interface Response extends AppPagination.Response<FileEntity> {}
  }

  export namespace GetByName {
    export interface Dto {
      filename: string;
    }
    export interface Response extends File {}
  }
}
