import React from 'react';
const fabric = require('fabric').fabric;

class CanvasEditor extends React.Component {
  componentDidMount() {
    this.canvas = new fabric.Canvas('c');
    this.canvas.on({
      'object:selected': this.onSelectTextElement,
    });
  }

  onSelectTextElement(evt) {
  }

  onChangeTextColor(color) {
    const text = this.canvas.getActiveObject();
    if (text) {
      text.set('fill', color);
      this.canvas.renderAll();
    }
  }

  sendObjectBackward() {
    const object = this.canvas.getActiveObject();
    if (object) {
      object.sendBackwards();
      this.canvas.renderAll();
    }
  }

  sendObjectForward() {
    const object = this.canvas.getActiveObject();
    if (object) {
      object.bringForward();
      this.canvas.renderAll();
    }
  }

  addTextElement() {
    const textElement = new fabric.IText('Hello World', { left: 100, top: 100, lockUniScaling: true });
    this.canvas.add(textElement);
    this.canvas.setActiveObject(textElement);
    textElement.selectAll();
    textElement.enterEditing();
  }

  deleteActiveObject() {
    const activeObject = this.canvas.getActiveObject();
    const activeObjectGroup = this.canvas.getActiveGroup();

    this.canvas.discardActiveGroup();
    if (activeObject) return this.canvas.remove(activeObject);
    return activeObjectGroup.getObjects().forEach((each) => this.canvas.remove(each));
  }

  render() {
    return (
      <div>
        <canvas
          id="c"
          height={this.props.canvasHeight}
          width={this.props.canvasWidth}
        />
      </div>
    );
  }
}

CanvasEditor.propTypes = {
  canvasHeight: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  canvasWidth: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
};

export default CanvasEditor;
