export interface BannerType {
	id: number;
	createTime: string;
	updateTime: string;
	isDeleted: number;
	title: string;
	imageUrl: string;
	linkUrl: string;
	sort: number;
}

// 一级分类
export interface CategoryLevel1Type {
	imageUrl: string;
	name: string;
	id: number;
}

// 活动宣传
export interface AdvertisementType {
	imageUrl: string;
	category2Id: number;
	id: number;
}

// 猜你喜欢/人气推荐 商品
export interface GoodType {
	id: number;
	createTime: string;
	updateTime: string;
	isDeleted: number;
	category1Id: number;
	category2Id: number;
	name: string;
	price: number;
	marketPrice: number;
	saleCount: number;
	stockCount: number;
	imageUrl: string;
	floralLanguage: string;
	applyUser: string;
	material: string;
	packing: string;
	isRecommend: number;
	detailList?: any;
}

