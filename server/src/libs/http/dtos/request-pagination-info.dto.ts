export class RequestPaginationInfoDto {
  readonly page: number;
  readonly perPage: number;
  readonly search: string | null;
  /** If `true`, all other pagination info will be ignored */
  readonly all: boolean;

  get skip() {
    return this.perPage * (this.page - 1);
  }

  get take() {
    return this.perPage;
  }

  constructor(params: Partial<RequestPaginationInfoDto>) {
    this.page = params.page || 1;
    this.perPage = params.perPage || 10;
    this.search = params.search || null;
    this.all = params.all || false;
  }
}
