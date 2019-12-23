

class Component {
    constructor() {
        this.id = Component.getNextId(); 
    }

    
    static getNextId() {
        this.id++;
        return this.id;
    }

    setContainer( container ) {
        this.container = container;
    }

    
    render() {
        return;
    }
}

Component.id = 0;
class Task extends Component {
    constructor( config ) {
        super();
        this.name = config.name;
        this.due = config.due;
    }

    update( config ) {
        Object.assign( this, config );
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="task pointer">
                ${this.name}
                <!--<i class="task-move fas fa-arrows-alt pointer"></i>-->
                <i class="task-edit fas fa-pencil-alt pointer"></i>
            </div>
            <div class="task-edit-form hide">
                <form>
                    <textarea rows="3" placeholder="Enter a title for this card..." class="task-edit-input full-width-input"></textarea>
                    <div class="task-edit-form-actions">
                        <button class="btn btn-inline btn-primary task-edit-button pointer">Update Task</button>
                        <i class="fas fa-2x fa-times task-edit-cancel pointer"></i>
                    </div>
                </form>
            </div>
        `;

        this.container.querySelector( '.task' ).addEventListener( 'click', function() {
            const isSelected = this.classList.contains( 'selected' );
            document.querySelectorAll( '.selected' ).forEach( node => node.classList.remove( 'selected' ) );
            if( !isSelected ) {
                this.classList.add( 'selected' );
            } else {
                this.classList.remove( 'selected' );
            }
        });

        this.container.querySelector( '.task-edit' ).addEventListener( 'click', () => {
            this.container.querySelector( '.task' ).classList.add( 'hide' );
            this.container.querySelector( '.task-edit-form' ).classList.remove( 'hide' );
            this.container.querySelector( '.task-edit-input' ).value = this.name;
        });

        this.container.querySelector( '.task-edit-cancel' ).addEventListener( 'click', () => {
            this.container.querySelector( '.task-edit-form' ).classList.add( 'hide' );
            this.container.querySelector( '.task' ).classList.remove( 'hide' );
        });

        this.container.querySelector( '.task-edit-button' ).addEventListener( 'click', ( event ) => {
            event.preventDefault();
            const taskText = this.container.querySelector( '.task-edit-input' ).value;
            if( taskText.trim() !== '' ) {
                this.update({
                    name: taskText
                });
            }
        });
    }
}

Task.id = 1;
class TaskList extends Component {
    constructor( config ) {
        super();
        this.name = config.name;
        this.tasks = config.tasks.map( taskConfig => new Task( taskConfig ) );
    }

    getTaskById( id /*: number | string */ ) {
        return this.tasks.find( task => task.id == id );
    }

    renderTasks( container ) {
        this.tasks.forEach( this.renderTask.bind( this, container ) );
    }

    renderTask( container, task ) {
        const taskWrapper = document.createElement( 'div' );
        taskWrapper.id = `component-${task.id}`;
        taskWrapper.classList.add( 'task-wrapper' );
        taskWrapper.setAttribute( 'draggable', true );

        taskWrapper.addEventListener( 'dragstart', function( event ) {
            this.classList.add( 'task-being-dragged' );
            // this.classList.add( 'hide' );
            // event.dataTransfer.setData( 'id', this.getAttribute( 'id' ) );
        });

        taskWrapper.addEventListener( 'dragenter', function( event ) {
            this.classList.add( 'task-being-dragged-over' );
        });
        
        taskWrapper.addEventListener( 'dragleave', function( event ) {
            this.classList.remove( 'task-being-dragged-over' );
        });

        container.appendChild( taskWrapper );
        
        task.setContainer( taskWrapper );
        task.render();
    }

    renderAddCard( container ) {
        if( this.tasks.length === 0 ) {
            container.innerHTML = `<div class="add-card-message pointer">+ Add card</div>`;
        } else {
            container.innerHTML = `<div class="add-card-message pointer">+ Add another card</div>`;
        }

        container.innerHTML += `
            <div class="add-card-form hide">
                <form>
                    <textarea rows="3" placeholder="Enter a title for this card..." class="add-card-input full-width-input"></textarea>
                    <div class="add-card-form-actions">
                        <button class="btn btn-inline btn-primary add-card-button pointer">Add Card</button>
                        <i class="fas fa-2x fa-times add-card-cancel pointer"></i>
                    </div>
                </form>
            </div>
        `;

        container.querySelector( '.add-card-message' ).addEventListener( 'click', function() {
            this.classList.add( 'hide' );
            container.querySelector( '.add-card-form' ).classList.remove( 'hide' );
        });

        container.querySelector( '.add-card-cancel' ).addEventListener( 'click', function() {
            container.querySelector( '.add-card-form' ).classList.add( 'hide' );
            container.querySelector( '.add-card-message' ).classList.remove( 'hide' );
        });

        container.querySelector( '.add-card-button' ).addEventListener( 'click', ( event ) => {
            event.preventDefault();
            const taskText = container.querySelector( '.add-card-input' ).value;
            if( taskText.trim() !== '' ) {
                this.pushTask(new Task({
                    name: taskText,
                    due: new Date()
                }));
            }
        });
    }

    render() {
        this.container.innerHTML = `
            <div class="task-list">
                <div class="task-list-title-container">
                    <h3 class="task-list-title">${this.name}</h3>
                    <span class="task-list-more pointer">...</span>
                </div>
                <div class="tasks-wrapper"></div>
                <div class="add-card-wrapper"></div>
            </div>
        `;

        this.container.querySelector( '.task-list' ).addEventListener( 'click', function() {
            const isSelected = this.classList.contains( 'selected-task-list' );
            document.querySelectorAll( '.selected-task-list' ).forEach( node => node.classList.remove( 'selected-task-list' ) );
            if( !isSelected ) {
                this.classList.add( 'selected-task-list' );
            } else {
                this.classList.remove( 'selected-task-list' );
            }
        });

        this.tasksWrapper = this.container.querySelector( '.tasks-wrapper' );
        this.renderTasks( this.tasksWrapper );
        this.renderAddCard( this.container.querySelector( '.add-card-wrapper' ) );

        // this.tasksWrapper.addEventListener( 'dragover', function( event ) {
        //     event.preventDefault();
        // });
        
        // this.tasksWrapper.addEventListener( 'drop', function( event ) {
        //     return;
        // });
    }

    pushTask( task ) {
        this.tasks.push( task );
        this.render();
    }

    removeTaskById( id ) {
        const idx = this.tasks.findIndex( task => task.id == id );
        const task = this.tasks.splice( idx, 1 )[0];
        
        this.render();

        return task;
    }

    addTaskAfter( task, id ) {
        if( id ) {
            const idx = this.tasks.findIndex( task => task.id == id );
            this.tasks.splice( idx + 1, 0, task );
        } else {
            this.tasks.push( task );
        }

        this.render();
    }
}

class Board extends Component {
    constructor( config, container ) {
        super();
        this.setContainer( container );
        this.name = config.name;
        this.taskLists = config.taskLists.map( taskListConfig => new TaskList( taskListConfig ) );
    }

    getTaskListById( id /*: number | string */ ) {
        return this.taskLists.find( taskList => taskList.id == id );
    }

    render() {
        this.container.innerHTML = `
            <div class="board-menu">
                <div class="board-title">${this.name}</div>
                <div class="board-show-menu">
                    <div class="board-show-menu-inner">
                        <i class="fas fa-ellipsis-v"></i>
                        Show menu
                    </div>
                    <div class="board-show-menu-items">
                        <div class="board-show-menu-item delete-selected-task pointer">
                            <i class="fas fa-times"></i>
                            Delete selected task
                        </div>
                        <div class="board-show-menu-item move-selected-task pointer">
                            <i class="fas fa-arrows-alt"></i>
                            Move selected task
                            <select>
                                ${this.taskLists.reduce( ( acc, taskList ) => acc + `<option>${taskList.name}`, `` )}
                            </select>
                        </div>
                        <div class="board-show-menu-item save-board pointer">
                            <i class="fas fa-save"></i>
                            Save board
                        </div>
                    </div>
                </div>
            </div>
            <div class="board">
                <div class="task-lists">
                    <div class="task-lists-wrapper"></div>
                    <!-- <div class="add-task-list-wrapper"></div> -->
                </div>
            </div>
        `;

        this.container.querySelector( '.board-show-menu-inner' ).addEventListener( 'click', function() {
            if( !this.parentNode.classList.contains( 'show-menu' ) ) {
                this.parentNode.classList.add( 'show-menu' );
            } else {
                this.parentNode.classList.remove( 'show-menu' );
            }
        });
        
        this.container.querySelector( '.delete-selected-task' ).addEventListener( 'click', () => {
            const selectedTaskEl = document.querySelector( '.task.selected' );
            const selectedTaskListEl = document.querySelector( '.task-list.selected-task-list' );
            let selectedTaskList;

            if( selectedTaskEl ) {
                selectedTaskList = this.getTaskListById( selectedTaskListEl.parentNode.id.split( '-' )[1] );
                selectedTaskList.removeTaskById( selectedTaskEl.parentNode.id.split( '-' )[1] );
            }
        });
        
        this.container.querySelector( '.save-board' ).addEventListener( 'click', () => {
            localStorage.setItem( 'board', JSON.stringify({
                name: this.name,
                taskLists: this.taskLists
            }));
        });

        this.renderTaskLists( this.container.querySelector( '.task-lists-wrapper' ) );
    }

    renderTaskLists( container ) {
        this.taskLists.forEach( this.renderTaskList.bind( this, container ) );
        
        const addTaskListWrapper = document.createElement( 'div' );
        addTaskListWrapper.classList.add( 'add-task-list-wrapper' );
        container.appendChild( addTaskListWrapper );

        this.renderAddTaskList( addTaskListWrapper );
    }

    renderTaskList( container, taskList ) {
        const taskListWrapperOuter = document.createElement( 'div' );
        // taskListWrapperOuter.id = `component-${taskList.id}`;
        taskListWrapperOuter.classList.add( 'task-list-wrapper-outer' );

        const taskListWrapper = document.createElement( 'div' );
        taskListWrapper.id = `component-${taskList.id}`;
        taskListWrapper.classList.add( 'task-list-wrapper' );

        taskListWrapperOuter.appendChild( taskListWrapper );

        const onDragenterOrDragover = function( event ) {
            event.preventDefault();
            taskListWrapper.classList.add( 'task-list-being-dragged-over' );
        };

        const onDragleaveOrDrop = function( event ) {
            taskListWrapper.classList.remove( 'task-list-being-dragged-over' );
        }

        taskListWrapper.addEventListener( 'dragenter', onDragenterOrDragover );
        taskListWrapper.addEventListener( 'dragover', onDragenterOrDragover );
        taskListWrapper.addEventListener( 'dragover', () => {
            // if this is the first time a task list is being dragged over, then it is the task list with the dragged task
            if( !this.container.querySelector( '.task-list-with-task-being-dragged' ) ) {
                taskListWrapper.classList.add( 'task-list-with-task-being-dragged' );
            }
        });
        
        taskListWrapper.addEventListener( 'dragleave', onDragleaveOrDrop );
        taskListWrapper.addEventListener( 'drop', event => {
            const taskElBeingDragged = document.querySelector( '.task-being-dragged' );
            const taskElBeingDraggedOver = document.querySelector( '.task-being-dragged-over' );
            const taskListElWithTaskBeingDragged  = document.querySelector( '.task-list-with-task-being-dragged' );
            const taskListElBeingDraggedOver  = document.querySelector( '.task-list-being-dragged-over' );
            
            // @todo taskListBeingDraggedOver would be same as "this" (??) - if so the following condition may be removed
            if( !taskListElBeingDraggedOver ) {
                return;
            }
            
            const taskListWithTaskBeingDragged = this.getTaskListById( taskListElWithTaskBeingDragged.id.split( '-' )[1] );
            const taskListBeingDraggedOver = this.getTaskListById( taskListElBeingDraggedOver.id.split( '-' )[1] );

            const idTaskBeingDragged = parseInt( taskElBeingDragged.id.split( '-' )[1] );
            let idTaskBeingDraggedOver = null;
            if( taskElBeingDraggedOver ) {
                idTaskBeingDraggedOver = parseInt( taskElBeingDraggedOver.id.split( '-' )[1] );
            }

            const taskBeingDragged = taskListWithTaskBeingDragged.removeTaskById( idTaskBeingDragged );
            taskListBeingDraggedOver.addTaskAfter( taskBeingDragged, idTaskBeingDraggedOver );

            console.log( idTaskBeingDragged, idTaskBeingDraggedOver );

            // taskElBeingDragged.classList.remove( 'task-being-dragged' );
            // taskElBeingDraggedOver.classList.remove( 'task-being-dragged-over' );
            
            // if( taskElBeingDraggedOver ) {
            //     // Reference: https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
            //     this.insertBefore( taskElBeingDragged, taskElBeingDraggedOver.nextSibling );
            //}

            taskListElWithTaskBeingDragged.classList.remove( 'task-list-with-task-being-dragged' );
        });
        taskListWrapper.addEventListener( 'drop', onDragleaveOrDrop );

        container.appendChild( taskListWrapperOuter );
        
        taskList.setContainer( taskListWrapper );
        taskList.render();
    }

    renderAddTaskList( container ) {
        let addListMessage, addListForm;
        
        if( this.taskLists.length === 0 ) {
            addListMessage = `<div class="add-list-message pointer">+ Add list</div>`;
        } else {
            addListMessage = `<div class="add-list-message pointer">+ Add another list</div>`;
        }

        addListForm = `
            <div class="add-list-form hide">
                <form>
                    <textarea rows="3" placeholder="Enter a title for this card..." class="add-list-input full-width-input"></textarea>
                    <div class="add-list-form-actions">
                        <button class="btn btn-inline btn-primary add-list-button pointer">Add List</button>
                        <i class="fas fa-2x fa-times add-list-cancel pointer"></i>
                    </div>
                </form>
            </div>
        `;

        container.innerHTML = `
            <div class="add-list">
                ${addListMessage}
                ${addListForm}
            </div>
        `;

        container.querySelector( '.add-list-message' ).addEventListener( 'click', function() {
            this.classList.add( 'hide' );
            container.querySelector( '.add-list-form' ).classList.remove( 'hide' );
        });

        container.querySelector( '.add-list-cancel' ).addEventListener( 'click', function() {
            container.querySelector( '.add-list-form' ).classList.add( 'hide' );
            container.querySelector( '.add-list-message' ).classList.remove( 'hide' );
        });

        container.querySelector( '.add-list-button' ).addEventListener( 'click', ( event ) => {
            event.preventDefault();
            const taskListText = container.querySelector( '.add-list-input' ).value;
            if( taskListText.trim() !== '' ) {
                this.pushTaskList(new TaskList({
                    name: taskListText,
                    tasks: []
                }));
            }
        });
    }

    pushTaskList( taskList ) {
        this.taskLists.push( taskList );
        this.render();
    }
}
let boardConfig = localStorage.getItem( 'board' );
if( !boardConfig ) {
    boardConfig = {
        name: 'New board',
        taskLists: []
    };
} else {
    boardConfig = JSON.parse( boardConfig );
}

const board = new Board( boardConfig, document.querySelector( '.board-container' ) );
board.render();

console.log( board );
