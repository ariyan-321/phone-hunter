const loadAllPhone=async (status,searchText)=>{

  const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText:"iphone"}`)
  const data=await res.json()
  if(status){
    DisplayAllPhone(data.data)
  }
  else{
    DisplayAllPhone(data.data.slice(0,6))
  }
}




const DisplayAllPhone=(phones)=>{
  const displayContainer=document.getElementById("phone-container")
  displayContainer.innerHTML=""
  phones.forEach(phone => {
    const div=document.createElement("div")
    div.innerHTML=`
      <div class="card card-compact bg-base-100 w-96 shadow-xl">
    <figure>
      <img
        src=${phone.image}
        alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${phone.brand}</h2>
      <p>${phone.phone_name}</p>
      <div class="card-actions justify-end">
        
    <button class="btn bg-green-400" onclick="phoneDetails('${phone.slug}')">Show Details</button>


      </div>
    </div>
  </div>
    
    
    `
    displayContainer.appendChild(div)
  });
}



const handleShowAll=()=>{
  loadAllPhone(true)
}


const handleSearch=()=>{
  const input=document.getElementById("search-input").value
  loadAllPhone(false,input)
}



const phoneDetails= async(slug)=>{
  const res=await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
  const data= await res.json()
  phone=data.data
  
  const modalContainer=document.getElementById("modal-container")

  modalContainer.innerHTML=`
      <dialog id="my_modal_1" class="modal">
      <div class="modal-box flex flex-col justify-center items-center space-y-3">
        <img src="${phone.image}" alt="${phone.phone_name}">
        <h3 class="text-lg font-bold">${phone.brand}</h3>
        <p class="py-4">${phone.name}</p>
        <p class="py-4">${phone.releaseDate}</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn bg-green-400">Close</button>
          </form>
        </div>
      </div>
    </dialog>

  ` 
  const modal=document.getElementById("my_modal_1")

  modal.showModal()
  
}







loadAllPhone(false)
