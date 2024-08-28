import type { GoodType } from "@/api/types/index.type"

export type Goods = GoodType

export interface GoodsListData {
	records: Goods[];
	total: number;
	size: number;
	current: number;
	orders: string[];
	optimizeCountSql: boolean;
	hitCount: boolean;
	countId?: any;
	maxLimit?: any;
	searchCount: boolean;
	pages: number;
}
