import { DataSourceInstanceSettings,DataQueryRequest,DataQueryResponse,DataQueryResponseData} from '@grafana/data';
import {Observable} from "rxjs";
import { DataSourceWithBackend } from '@grafana/runtime';
import { MyDataSourceOptions, MyQuery } from './types';

export class MockupResponse implements DataQueryResponse{
  constructor(data:DataQueryResponseData[]){
    this.data = data
  }
  data: DataQueryResponseData[];
}
export class DataSource extends DataSourceWithBackend<MyQuery, MyDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
  }
  
  query(request: DataQueryRequest<MyQuery>): Observable<DataQueryResponse>{
    console.log(request)
    console.log(super.query(request))
   
   let rs = Observable.create(function(response:DataQueryResponse){
    let data:DataQueryResponseData[] = new Array();
    response = new MockupResponse(data);
    response.data.push([{fileds:[{name:"Test",type:"number",values:[1,2]}]}])
   })
   console.log(rs)
    return rs;
  }
}


