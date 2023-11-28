import { ResponseBodyDto } from '@/libs/http';
import { LoginResponseDto } from '@/modules/auth/dtos';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { appUrl, testUser } from '@test/fixtures';
import { catchError, lastValueFrom, map, throwError } from 'rxjs';

const httpService = new HttpService();

export function getToken(): Promise<LoginResponseDto> {
  return lastValueFrom(
    httpService
      .post(`${appUrl}/v1/auth/login`, {
        email: testUser.email,
        password: testUser.password,
      })
      .pipe(
        catchError((err, caught) => {
          return throwError(
            () =>
              new Error(
                `Failed to fetch token. ${
                  (err && err.response && err.response.data) || err
                }`,
              ),
          );
        }),
        map(
          (response: AxiosResponse<ResponseBodyDto<LoginResponseDto>>) =>
            response.data && response.data.data,
        ),
      ),
  );
}
