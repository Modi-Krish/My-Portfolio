import ScrollReveal from './ScrollReveal';
import devsyncData from '../constants/devsyncData.json';

export default function LinkedInUpdates() {
  const posts = devsyncData?.linkedinPosts || [];

  if (posts.length === 0) return null;

  return (
    <section className="section" id="linkedin">
      <div className="section__container">
        <ScrollReveal>
          <div className="section__header">
            <span className="section__label">Social Updates</span>
            <h2 className="section__title">Viral Posts</h2>
            <p className="section__subtitle">
              Dynamically synced from DevSync CMS showcasing my top LinkedIn activity.
            </p>
          </div>
        </ScrollReveal>

        <div className="linkedin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {posts.map((post, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div 
                className="linkedin-card" 
                style={{
                  background: 'var(--card-bg, #fff)', 
                  border: '1px solid var(--border-color, #eaeaea)', 
                  padding: '1.5rem', 
                  borderRadius: '12px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, background: '#0a66c2', color: '#fff', padding: '4px 12px', borderBottomLeftRadius: '12px', borderTopRightRadius: '11px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {post.likes} Likes
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#0a66c2', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    in
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>LinkedIn Update</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1, whiteSpace: 'pre-line' }}>
                  {post.content}
                </p>

                {post.url && (
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: '#0a66c2', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '16px', display: 'inline-block' }}
                  >
                    View on LinkedIn <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginLeft: '4px', fontSize: '0.8em' }}></i>
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
