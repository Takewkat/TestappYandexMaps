import React, { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './List.css';

function List ({ points, deletePoint, dragPoint }) {
  //Мы используем source.index, чтобы найти элемент в новом массиве и удалить его с помощью splice
  //Затем мы используем destination.index чтобы добавить этот элемент обратно в массив, но в новом месте, снова используя splice
  //source.index, destination.index из либы, на верхнем уровне App это srcIndex, destIndex
  const OnDragEnd = useCallback((result) => {    
    if (!result.destination) return;
    dragPoint(result.source.index, result.destination.index);    
  }, [points]);
  //берем из либы то, что нужно для листа:
  return (
    <DragDropContext onDragEnd={OnDragEnd}>
      <Droppable droppableId="allo">
        {(provided) =>        
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {points.map((p, index) => {
              return (
                <Draggable key={p.id} draggableId={String(p.id)} index={index}>
                  {(provided) => (
                    <li className="list-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>                     
                        <span>{ p.label }</span>
                        <button onClick={ () => deletePoint(p.id) }>X</button>                      
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        }    
      </Droppable>
    </DragDropContext>    
  );
}

export default List;