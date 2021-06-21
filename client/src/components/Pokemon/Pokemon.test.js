import React from 'react';
import { NavLink } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { DEFAULT_IMAGE } from '../../utils/constants'

import Pokemon from './Pokemon';

Enzyme.configure({ adapter: new Adapter() });

describe('<Nav />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Pokemon
            id={2}
            name={'test'}
            image={DEFAULT_IMAGE}
            types={['electric']}
        />);
    });

    describe('Pokemon test', () => {
        it('It should render a <NavLink/>', () => {
            expect(wrapper.find(NavLink)).to.have.lengthOf(1);
        });
        it('<NavLink/> should have a link classname', () => {
            expect(wrapper.find(NavLink).hasClass('link')).to.equal(true);
        });
        it('should lead to the route /home/pokemon/id', () => {
            expect(wrapper.find(NavLink).at(0).prop('to')).to.equal('/home/pokemon/2');
        });
        it('It should render a three <div/>', () => {
            expect(wrapper.find('div')).to.have.lengthOf(3);
        });
        it('should render the sent image', () => {
            expect(wrapper.find('img').prop('src')).to.equal(DEFAULT_IMAGE);
        });
        it('should render one span for each type', () => {
            expect(wrapper.find('span')).to.have.lengthOf(2);
        });
    });
});