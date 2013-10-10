
/**
 * Module dependencies.
 */

var model = require('model');

/**
 * Task model.
 */

var Task = model('Task')
  .attr('id', { required: true, type: 'number' })
  .attr('name', { required: true, type: 'string' })
  .attr('created_at', { type: 'date' })
  .attr('assignee')
  .attr('assignee_status')
  .attr('completed')
  .attr('parent')
  .attr('workspace');

/**
 * Title of a task.
 */

Task.prototype.title = function() {
  return this.name().replace(/\[[^\]*]\]/g, '');
};

/**
 * Estimate of a task.
 */

Task.prototype.estimate = function() {
  var estimate = /\[(\d+)\]/.exec(this.name());
  return estimate ? estimate[1] : 0;
};

/**
 * Priority of a task.
 */

Task.prototype.priority = function() {
  var priority = /\[(VL|L|M|H|VH)\]/.exec(this.name());
  return priority ? priority[1] : '-';
};

/**
 * User story.
 */

Task.prototype.story = function() {
  var story = this['parent']();
  return story != null ? story.name : '';
};

/**
 * Expose `Task`.
 */

module.exports = Task;

