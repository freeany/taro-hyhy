export interface Address {
	id: number;
	name: string;
	phone: string;
	provinceCode: string;
	cityCode: string;
	districtCode: string;
	address: string;
	fullAddress: string;
	isDefault: number;
	provinceName?: any;
	cityName?: any;
	districtName?: any;
}


export type AddressListType = Address[]
