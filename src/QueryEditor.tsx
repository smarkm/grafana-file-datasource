import { QueryEditorProps } from '@grafana/data';
import { LegacyForms,ButtonSelect } from '@grafana/ui';
import defaults from 'lodash/defaults';
import React, { ChangeEvent, PureComponent } from 'react';
import { DataSource } from './DataSource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';

const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, queryText: event.target.value });
  };

  
  onConstantChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, constant: parseFloat(event.target.value) });
    // executes the query
    onRunQuery();
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { queryText, constant } = query;

    return (
      <div className="gf-form">
        <FormField
          width={4}
          value={constant}
          onChange={this.onConstantChange}
          label="Sub Path Filter"
          type="number"
          step="0.1"
        />
        <FormField
          labelWidth={8}
          value={queryText || ''}
          onChange={this.onQueryTextChange}
          label="File Filter"
          tooltip="File Name Filter"
        />
        <ButtonSelect
        placeholder="Actions"
        value=""
        options={[{label:"JSON",value:"JSON"},{label:"CSV",value:"CSV"},{label:"Count",value:"Count"}]}
        onChange={v => {
          //setValue(v);
        }}
        allowCustomValue
        //{...getDynamicProps()}
      />
      </div>
    );
  }
}
