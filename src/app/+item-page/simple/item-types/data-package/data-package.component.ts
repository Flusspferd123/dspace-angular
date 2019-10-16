import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemDataService } from '../../../../core/data/item-data.service';
import { Item } from '../../../../core/shared/item.model';
import {
  DEFAULT_ITEM_TYPE, ItemViewMode,
  rendersItemType
} from '../../../../shared/items/item-type-decorator';
import { ITEM } from '../../../../shared/items/switcher/item-type-switcher.component';
import { ItemComponent } from '../shared/item.component';
import { MetadataRepresentation } from '../../../../core/shared/metadata-representation/metadata-representation.model';
import { filterRelationsByTypeLabel, relationsToItems } from '../shared/item-relationships-utils';

@rendersItemType('DataPackage', ItemViewMode.Full)
@Component({
  selector: 'ds-data-package',
  styleUrls: ['./data-package.component.scss'],
  templateUrl: './data-package.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPackageComponent extends ItemComponent implements OnInit {
  /**
   * The authors related to this publication
   */
  authors$: Observable<MetadataRepresentation[]>;

  /**
   * The projects related to this publication
   */
  dataFiles$: Observable<Item[]>;

  constructor(
    @Inject(ITEM) public item: Item,
    private ids: ItemDataService
  ) {
    super(item);
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.resolvedRelsAndTypes$) {

      this.authors$ = this.buildRepresentations('Person', 'dc.contributor.author');

      this.dataFiles$ = this.resolvedRelsAndTypes$.pipe(
        filterRelationsByTypeLabel('isDataFileOfDataPackage'),
        relationsToItems(this.item.id)
      );

    }
  }
}