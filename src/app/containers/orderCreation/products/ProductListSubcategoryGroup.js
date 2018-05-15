import React from 'react';
import ProductListItem from './ProductListItem';

export default class ProductListSubcategoryGroup extends React.Component {
    render() {
        const { onItemSelect, subcategory, category } = this.props;
        const { name, products } = subcategory;

        return (
            <div>
                <li className="px-4 py-2 border-t bg-grey-lighter">
                    <p className="pl-4 capitalize">{name}</p>
                </li>
                {products.map((product) => <ProductListItem category={category} key={product.id} product={product} onClick={onItemSelect}/>)}
            </div>
        );
    }
}