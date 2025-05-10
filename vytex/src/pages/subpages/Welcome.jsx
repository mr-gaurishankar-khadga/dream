import React, { useState, useEffect } from 'react';
import { Camera, Palette, Code, Music, Video, Layout, Users, Globe, Zap, Award, ArrowRight, ChevronRight, Star } from 'lucide-react';
import './Welcome.css';

const Welcome = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ch_animate_in');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.ch_animate_on_scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`ch_welcome_container ${isLoaded ? 'ch_loaded' : ''}`}>
     
      <div className="ch_bg_shapes">
        <div className="ch_shape ch_shape_1"></div>
        <div className="ch_shape ch_shape_2"></div>
        <div className="ch_shape ch_shape_3"></div>
        <div className="ch_shape ch_shape_4"></div>
      </div>

      <div className="ch_welcome_hero">
        <div className="ch_hero_content">
          <div className="ch_hero_badge">
            <span className="ch_badge_icon">✨</span>
            <span className="ch_badge_text">Next-Gen Creative Platform</span>
          </div>
          
          <h1 className="ch_hero_title">
            <span className="ch_title_line">Create Without Limits</span>
            <span className="ch_title_highlight">All Tools. One Hub.</span>
          </h1>
          
          <p className="ch_hero_description">
            Unlock your creative potential with our all-in-one platform that brings together powerful tools for designers, developers, photographers, musicians, and content creators.
          </p>
          
          <div className="ch_hero_cta">
            <button className="ch_primary_btn ch_get_started_btn">
              Start Creating <ArrowRight size={18} />
            </button>
            <button className="ch_secondary_btn ch_watch_tour_btn">
              Watch Tour
            </button>
          </div>
          
          <div className="ch_hero_stats">
            <div className="ch_stat">
              <span className="ch_stat_number">10M+</span>
              <span className="ch_stat_label">Creators</span>
            </div>
            <div className="ch_stat_divider"></div>
            <div className="ch_stat">
              <span className="ch_stat_number">25+</span>
              <span className="ch_stat_label">Creative Tools</span>
            </div>
            <div className="ch_stat_divider"></div>
            <div className="ch_stat">
              <span className="ch_stat_number">99%</span>
              <span className="ch_stat_label">Satisfaction</span>
            </div>
          </div>
        </div>
        
        <div className="ch_hero_visual">
          <div className="ch_tools_showcase">
            <div className="ch_tool_card ch_tool_primary">
              <div className="ch_tool_icon_wrapper ch_icon_design">
                <Palette className="ch_tool_icon" size={28} />
              </div>
              <div className="ch_tool_content">
                <span className="ch_tool_name">Design Studio</span>
                <span className="ch_tool_feature">Professional Graphics Tools</span>
              </div>
              <ChevronRight className="ch_card_arrow" size={18} />
            </div>
            
            <div className="ch_tool_card ch_tool_secondary">
              <div className="ch_tool_icon_wrapper ch_icon_code">
                <Code className="ch_tool_icon" size={28} />
              </div>
              <div className="ch_tool_content">
                <span className="ch_tool_name">Code Editor</span>
                <span className="ch_tool_feature">Smart Development Environment</span>
              </div>
              <ChevronRight className="ch_card_arrow" size={18} />
            </div>
            
            <div className="ch_tool_card ch_tool_accent">
              <div className="ch_tool_icon_wrapper ch_icon_photo">
                <Camera className="ch_tool_icon" size={28} />
              </div>
              <div className="ch_tool_content">
                <span className="ch_tool_name">Photo Editor</span>
                <span className="ch_tool_feature">Professional Image Processing</span>
              </div>
              <ChevronRight className="ch_card_arrow" size={18} />
            </div>
            
            <div className="ch_floating_card ch_floating_audio">
              <div className="ch_tool_icon_wrapper ch_icon_audio">
                <Music className="ch_tool_icon" size={24} />
              </div>
              <span className="ch_tool_name">Audio Studio</span>
            </div>
            
            <div className="ch_floating_card ch_floating_video">
              <div className="ch_tool_icon_wrapper ch_icon_video">
                <Video className="ch_tool_icon" size={24} />
              </div>
              <span className="ch_tool_name">Video Editor</span>
            </div>
            
            <div className="ch_floating_card ch_floating_templates">
              <div className="ch_tool_icon_wrapper ch_icon_templates">
                <Layout className="ch_tool_icon" size={24} />
              </div>
              <span className="ch_tool_name">Templates</span>
            </div>
          </div>
        </div>
      </div>

      <div id="tools" className="ch_tools_section">
        <div className="ch_section_header">
          <div className="ch_section_badge">All-in-One Platform</div>
          <h2 className="ch_section_title">Powerful Creative Tools</h2>
          <p className="ch_section_subtitle">Everything you need to bring your ideas to life</p>
        </div>
        
        <div className="ch_tools_grid animate_on_scroll">
          <div className="ch_tool_block ch_animate_on_scroll">
            <div className="ch_tool_block_icon ch_design_gradient">
              <Palette size={32} />
            </div>
            <h3 className="ch_tool_block_title">Design Studio</h3>
            <p className="ch_tool_block_description">
              Create stunning graphics, illustrations, and UI designs with our powerful design tools.
            </p>
            <a href="#" className="ch_tool_block_link">
              Explore <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="ch_tool_block ch_animate_on_scroll">
            <div className="ch_tool_block_icon ch_code_gradient">
              <Code size={32} />
            </div>
            <h3 className="ch_tool_block_title">Code Editor</h3>
            <p className="ch_tool_block_description">
              Write, test, and deploy code with intelligent features and syntax highlighting.
            </p>
            <a href="#" className="ch_tool_block_link">
              Explore <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="ch_tool_block ch_animate_on_scroll">
            <div className="ch_tool_block_icon ch_photo_gradient">
              <Camera size={32} />
            </div>
            <h3 className="ch_tool_block_title">Photo Editor</h3>
            <p className="ch_tool_block_description">
              Edit and enhance your photos with professional-grade tools and filters.
            </p>
            <a href="#" className="ch_tool_block_link">
              Explore <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="ch_tool_block ch_animate_on_scroll">
            <div className="ch_tool_block_icon ch_audio_gradient">
              <Music size={32} />
            </div>
            <h3 className="ch_tool_block_title">Audio Studio</h3>
            <p className="ch_tool_block_description">
              Record, mix, and master audio with our powerful digital audio workstation.
            </p>
            <a href="#" className="ch_tool_block_link">
              Explore <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="ch_tool_block ch_animate_on_scroll">
            <div className="ch_tool_block_icon ch_video_gradient">
              <Video size={32} />
            </div>
            <h3 className="ch_tool_block_title">Video Editor</h3>
            <p className="ch_tool_block_description">
              Create stunning videos with timeline editing, effects, and transitions.
            </p>
            <a href="#" className="ch_tool_block_link">
              Explore <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="ch_tool_block ch_animate_on_scroll">
            <div className="ch_tool_block_icon ch_templates_gradient">
              <Layout size={32} />
            </div>
            <h3 className="ch_tool_block_title">Templates</h3>
            <p className="ch_tool_block_description">
              Start with professionally designed templates for any creative project.
            </p>
            <a href="#" className="ch_tool_block_link">
              Explore <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <div id="features" className="ch_features_section">
        <div className="ch_section_header">
          <div className="ch_section_badge">Why Choose Us</div>
          <h2 className="ch_section_title">Features that Set Us Apart</h2>
          <p className="ch_section_subtitle">Designed for the modern creator</p>
        </div>
        
        <div className="ch_features_container">
          <div className="ch_feature_card ch_animate_on_scroll">
            <div className="ch_feature_icon">
              <Zap size={28} />
            </div>
            <h3 className="ch_feature_title">Seamless Integration</h3>
            <p className="ch_feature_text">
              All tools work together perfectly, allowing you to switch between them without losing your workflow.
            </p>
          </div>
          
          <div className="ch_feature_card ch_animate_on_scroll">
            <div className="ch_feature_icon">
              <Globe size={28} />
            </div>
            <h3 className="ch_feature_title">Cloud Sync</h3>
            <p className="ch_feature_text">
              Access your projects from anywhere, on any device, with automatic cloud synchronization.
            </p>
          </div>
          
          <div className="ch_feature_card ch_animate_on_scroll">
            <div className="ch_feature_icon">
              <Users size={28} />
            </div>
            <h3 className="ch_feature_title">Collaboration</h3>
            <p className="ch_feature_text">
              Work together in real-time with team members and clients on any project.
            </p>
          </div>
          
          <div className="ch_feature_card ch_animate_on_scroll">
            <div className="ch_feature_icon">
              <Award size={28} />
            </div>
            <h3 className="ch_feature_title">Professional Quality</h3>
            <p className="ch_feature_text">
              Industry-standard tools that deliver professional-grade results every time.
            </p>
          </div>
        </div>
      </div>

      <div className="ch_testimonial_section ch_animate_on_scroll">
        <div className="ch_testimonial_card">
          <div className="ch_testimonial_stars">
            <Star className="ch_star" size={20} fill="#fbbf24" />
            <Star className="ch_star" size={20} fill="#fbbf24" />
            <Star className="ch_star" size={20} fill="#fbbf24" />
            <Star className="ch_star" size={20} fill="#fbbf24" />
            <Star className="ch_star" size={20} fill="#fbbf24" />
          </div>
          <p className="ch_testimonial_text">
            "Creator Hub has revolutionized my workflow. Having all these professional tools in one place has saved me countless hours and helped me deliver better results for my clients."
          </p>
          <div className="ch_testimonial_author">
            <div className="ch_author_avatar">JD</div>
            <div className="ch_author_info">
              <p className="ch_author_name">Jane Doe</p>
              <p className="ch_author_title">Freelance Designer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ch_cta_section ch_animate_on_scroll">
        <div className="ch_cta_content">
          <h2 className="ch_cta_title">Ready to Create Without Limits?</h2>
          <p className="ch_cta_text">Join thousands of creators who have already elevated their creative workflow.</p>
          <button className="ch_cta_button">Get Started Today</button>
        </div>
        <div className="ch_cta_shapes">
          <div className="ch_cta_shape ch_cta_shape_1"></div>
          <div className="ch_cta_shape ch_cta_shape_2"></div>
          <div className="ch_cta_shape ch_cta_shape_3"></div>
        </div>
      </div>
      
      <footer className="ch_footer">
        <div className="ch_footer_logo">
          <span className="ch_logo_icon">✦</span>
          <span className="ch_logo_text">CreatorHub</span>
        </div>
        <div className="ch_footer_copyright">
          © 2025 Creator Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Welcome;