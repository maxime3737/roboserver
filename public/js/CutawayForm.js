/**
 * An organized way to access how we want to cut away the map.
 */
class CutawayForm {

  /**
   * An organized way to access how we want to cut away the map.
   * @param {HTMLButtonElement} axisForm
   * @param {HTMLButtonElement} operationForm 
   * @param {HTMLInputElement} cutawayValueForm 
   */
  constructor(axisForm, operationForm, cutawayValueForm) {
    this.axis = axisForm;
    this.operation = operationForm;
    this.cutawayValue = cutawayValueForm;

    this.axis.states = ['X', 'Y', 'Z'];
    this.operation.states = ['>', '<'];

    var changeState = (e)=>{
      var button = e.target;
      var currentState = button.states.indexOf(button.textContent);
      var nextState = currentState == button.states.length - 1 ? 0 : currentState + 1;
      button.textContent = button.states[nextState];
    };

    this.axis.addEventListener('click', changeState);
    this.operation.addEventListener('click', changeState);

  }

  /**
   * Removes any values from the form.
   */
  clear() {
    this.cutawayValue.value = "";
  }

  /**
   * Used to add one event listener to all inputs.
   * @param {string} type
   * @param {function} listener
   */
  addEventListener(type, listener) {
    this.axis.addEventListener(type, listener);
    this.operation.addEventListener(type, listener);
    this.cutawayValue.addEventListener(type, listener);
  }

  /**
   * Lets us know whether a voxel should be displayed given the entered cutaway point.
   * @param {object} vec 
   * @returns {boolean}
   */
  shouldBeRendered(vec) {
    var axisName = this.axis.textContent;
    var operationName = this.operation.textContent;
    var cutawayValue = parseInt(this.cutawayValue.value);
    var result = true;
    if (!isNaN(cutawayValue)) {
      var axisNameMap = {
        'X': 'x',
        'Y': 'y',
        'Z': 'z'
      }
      var coord = vec[axisNameMap[axisName]];
      
      if (operationName == '>') {
        if (coord > cutawayValue) {
          result = false;
        }
      }
      else if (operationName == '<') {
        if (coord < cutawayValue) {
          result = false;
        }
      }
    }
    return result;
  }

}