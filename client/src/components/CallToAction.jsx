import React from 'react'
import './styles/callToAction.css'

export default function CallToAction() {
  return (
    <div className='call-to-action'>
        <div className="cta-message">
            <h2>Want to learn more about JavaScript Class</h2>
            <p>Check out these resources more thorough understanding.</p>
            <button>
                <a href="https://www.w3schools.com/js/js_classes.asp" target='_blank' rel='noopener noreferrer'>
                    JavaScript Classes
                </a>
            </button>
        </div>
        <div className="cta-img-box">
            <img src="https://smashingtips.com/wp-content/uploads/2023/04/How_to_use_Java_Script_classes_.webp" alt="JavaScript Class" />
        </div>
    </div>
  )
}
