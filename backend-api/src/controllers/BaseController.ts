import { instanceToPlain } from 'class-transformer';
import { SuccessResponseDto } from 'src/dto/responses/SuccessResponseDto';
import { ILoggingUtil } from 'src/utils/logging.util';


export abstract class BaseController {
    buildSuccessResponse(data: Object | null) {
        return new SuccessResponseDto(instanceToPlain(data));
    }

    logAPIData(logger: ILoggingUtil, request: any, payload: Object) {
        let logData = {
            payload: payload,
            _traceId: request.body?._traceId
        };
        logger.data(request.url, logData);
    }
}
