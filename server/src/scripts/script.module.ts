import { DynamicModule, Module } from '@nestjs/common';
import { SharedModule } from '@/libs';

@Module({})
export class ScriptModule {
  static for(module: any): DynamicModule {
    return {
      module: ScriptModule,
      imports: [SharedModule, module],
    };
  }
}
