import React from 'react';
import ReactDOM from 'react-dom';


const Card = ({ user }) => {
  return (
    <>
    {user.map((item, index) => (
        <div key={index} className='card border rounded-lg p-4 shadow-md flex flex-col items-center gap-2 flex-1 hover:bg-gray-100 transition duration-300 transform hover:scale-105'>
            <picture className='cardImage w-16 h-16 rounded-full overflow-hidden'>
                <source srcSet={item.picture.large} type="image/webp" />
                <img src={item.picture.large} alt={`${item.name.first} ${item.name.last}`} />
            </picture>
            <h2 className='cardHeader mt-4'>{item.name.title}{item.name.first} {item.name.last}</h2>
            <p className='description'>{item.email}</p>
        </div>
    ))}
    </>
  )
}

export default Card