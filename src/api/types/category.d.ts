export interface Children {
	imageUrl: string;
	name: string;
	id: number;
}

export interface Category {
	children: Children[];
	imageUrl: string;
	name: string;
	id: number;
}
