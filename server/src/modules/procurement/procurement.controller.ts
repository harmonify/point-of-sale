import { Receiving } from "../../entity/Receiving";
import {
  Get,
  Post,
  Body,
  JsonController,
  Authorized,
  QueryParam,
  Param,
  Put,
  Delete
} from "routing-controllers";
import {
  PaginationInfo,
  IPaginationQueryParam
} from "../../decorators/PaginationInfo";
import { IFetchPageQuery } from "../../services/CrudServices";
import { ProcurementServices } from "../../services/ProcurementServices";
import { CurrentUser } from "../../decorators/CurrentUser";

@Controller("/procurement")
@Authorized()
export class ProcurementController {
  constructor(private procurementervices: ProcurementServices) {}

  @Get("/:id")
  public async getReceivingById(@Param("id") id: string): Promise<any> {
    const res = await this.procurementervices.fetchById(id);
    return res || {};
  }

  @Get()
  public async getProcurement(
    @PaginationInfo() paginationInfo: IPaginationQueryParam,
    @QueryParam("q") search?: string
  ): Promise<Receiving[]> {
    const query: IFetchPageQuery = {
      search,
      perPage: paginationInfo.perPage,
      page: paginationInfo.pageNo
    };
    return await this.procurementervices.fetchPages(query);
  }

  @Post()
  public async createNewReceiving(
    @Body() Receiving: Receiving,
    @CurrentUser() userid: string
  ): Promise<any> {
    return await this.procurementervices.create(userid, Receiving);
  }

  @Put("/:id")
  public async updateReceiving(
    @Param("id") id: string,
    @Body() data: Receiving,
    @CurrentUser() userid: string
  ) {
    return await this.procurementervices.updateById(userid, { id }, data);
  }

  @Delete("/:id")
  public async deleteReceiving(@Param("id") id: string): Promise<any> {
    return await this.procurementervices.deleteById(id);
  }
}
