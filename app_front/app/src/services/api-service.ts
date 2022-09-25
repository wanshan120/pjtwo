import { apiService } from 'ts-api-toolkit';

apiService.changeBaseUrl('http://localhost:8080/api/v1');
apiService.changeAuthSchema('Token');

export default apiService;
