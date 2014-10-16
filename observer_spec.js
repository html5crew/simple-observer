/*global beforeEach, afterEach, describe, expect, it, spyOn, xdescribe, xit, jasmine */
/*global Observer*/
describe('observable', function () {
    'use strict';

    beforeEach(function () {
        this.observable = new Observer();

        this.callback1 = jasmine.createSpy();
        this.callback2 = jasmine.createSpy();
    });

    afterEach(function () {
        delete this.observable;
    });

    it('하나의 event를 등록한다.', function () {
        this.observable.on('a', this.callback1);

        this.observable.emit('a', 1, 2);
        expect(this.callback1).toHaveBeenCalledWith(1, 2);
    });

    it('여러 event를 등록한다.', function () {
        this.observable.on(['a', 'b'], this.callback1);

        this.observable.emit('a', 1, 2);
        expect(this.callback1).toHaveBeenCalledWith(1, 2);

        this.observable.emit('b', 3, 4);
        expect(this.callback1).toHaveBeenCalledWith(3, 4);
    });


    it('여러 event를 전파한다.', function () {
        this.observable.on(['a', 'b'], this.callback1);
        this.observable.on('c', this.callback2);

        this.observable.emit(['a', 'c'], 1, 2);
        expect(this.callback1).toHaveBeenCalledWith(1, 2);
        expect(this.callback2).toHaveBeenCalledWith(1, 2);
    });

    it('여러 event listener를 제거한다.', function () {
        this.observable.on('a', this.callback1);
        this.observable.on(['b', 'c'], this.callback1);
        this.observable.off(['a', 'b'], this.callback1);

        this.observable.emit('a', 1, 2);
        expect(this.callback1).not.toHaveBeenCalled();

        this.observable.emit(['a', 'b'], 3, 4);
        expect(this.callback1).not.toHaveBeenCalled();

        this.observable.emit(['b', 'c'], 5, 6);
        expect(this.callback1).toHaveBeenCalledWith(5, 6);
    });

    it('일회용 event 등록 기능을 지원한다.', function () {
        this.observable.once('onetime', this.callback1);
        this.observable.emit('onetime', 1, 2);
        expect(this.callback1).toHaveBeenCalledWith(1, 2);

        this.observable.emit('onetime');
        expect(this.callback1.callCount).toBe(1);
    });

    it('일회용 event 등록, 해제가능하다.', function () {
        this.observable.once('onetime', this.callback1);
        this.observable.off('onetime', this.callback1);
        this.observable.emit('onetime');
        expect(this.callback1).not.toHaveBeenCalled();
    });
});