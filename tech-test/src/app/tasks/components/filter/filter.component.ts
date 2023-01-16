import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Filter } from '../../../constants/constant';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  @Output() filter: EventEmitter<any> = new EventEmitter();
  public filters = [
    {
      label: 'Only done',
      value: Filter.done,
    },
    {
      label: 'Only not done',
      value: Filter.ongoing,
    },
    {
      label: 'Only house category',
      value: Filter.house,
    },
    {
      label: 'Only bureaucracy category',
      value: Filter.bureaucracy,
    },
    {
      label: 'All',
      value: Filter.all,
    }
  ];

  public onFilter(filter: Filter): void {
    this.filter.emit(filter);
  }

}
