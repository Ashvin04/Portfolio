import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import P5RansomText from '../components/P5RansomText';
import AJStar from '../components/AJStar';
import './ProjectDetails.css';

const CODE_SNIPPETS = {
  powerUpEffect: `// PowerUpEffect.cs - Strategy Pattern Abstraction
public abstract class PowerUpEffect
{
    protected PlayerReferences Player;

    public virtual void OnEquip(PlayerReferences player)
    {
        Player = player;
        OnActivate();
    }

    public virtual void OnUnequip()
    {
        OnDeactivate();
        Player = default;
    }

    protected abstract void OnActivate();
    protected abstract void OnDeactivate();
}

public abstract class PowerUpDefinition : ScriptableObject
{
    public string Name;
    [TextArea] public string Description;

    public abstract PowerUpEffect CreateEffect();
}`,
  // Client-side C# syntax highlighter function
  highlightCSharpCode: (code) => {
    if (!code) return '';
    // Escape HTML special characters
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // RegExp mappings for syntax highlighting
    const rules = [
      // Comments (// ...)
      { regex: /(\/\/.*)/g, klass: 'p5-code-comment' },
      // Attribute labels ([CreateAssetMenu...])
      { regex: /(\[[A-Za-z0-9_\s\(\)\=",\.\/]+\])/g, klass: 'p5-code-attribute' },
      // String literals ("...")
      { regex: /(".*?")/g, klass: 'p5-code-string' },
      // Numeric values
      { regex: /\b(\d+(?:\.\d+)?[fF]?)\b/g, klass: 'p5-code-number' },
      // Primary control structures and keywords
      { regex: /\b(public|private|protected|abstract|class|override|virtual|void|override|int|float|string|bool|var|new|return|if|else|this|default|base|using)\b/g, klass: 'p5-code-keyword' }
    ];

    // Apply rules sequentially using unique placeholders to avoid overlapping replacements
    let tokenized = escaped;
    const placeholders = [];

    rules.forEach((rule, idx) => {
      tokenized = tokenized.replace(rule.regex, (match) => {
        const placeholder = `___TOKEN_${idx}_${placeholders.length}___`;
        placeholders.push({
          placeholder,
          html: `<span class="${rule.klass}">${match}</span>`
        });
        return placeholder;
      });
    });

    // Restore matches in reverse order
    for (let i = placeholders.length - 1; i >= 0; i--) {
      tokenized = tokenized.replace(placeholders[i].placeholder, placeholders[i].html);
    }

    return <span dangerouslySetInnerHTML={{ __html: tokenized }} />;
  },
  giantPowerUp: `// GiantPowerUp.cs - Concrete Strategy with ScriptableObject Balancing
[CreateAssetMenu(menuName = "PowerUps/Giant Transformation")]
public class GiantPowerUpDefinition : PowerUpDefinition
{
    public float ScaleMultiplier = 2.0f;
    public int BonusHealth = 100;
    public float SpeedMultiplier = 0.6f;
    public float MeleeRangeMultiplier = 2.0f;
    public float BulletSizeMultiplier = 2.5f;

    public override PowerUpEffect CreateEffect()
    {
        return new GiantPowerUpEffect(this);
    }
}

public class GiantPowerUpEffect : PowerUpEffect
{
    private GiantPowerUpDefinition m_Def;
    private Vector3 m_OriginalScale;

    public GiantPowerUpEffect(GiantPowerUpDefinition def) => m_Def = def;

    protected override void OnActivate()
    {
        m_OriginalScale = Player.GameObject.transform.localScale;
        Player.GameObject.transform.localScale = m_OriginalScale * m_Def.ScaleMultiplier;

        if (Player.Health != null)
        {
            Player.Health.MaxHealthModifiers.Add(GetHealthBonus);
            Player.Health.RefreshHealthUI();
            if (Player.Health.IsServer) Player.Health.Heal(m_Def.BonusHealth);
        }
        if (Player.Movement != null) Player.Movement.SpeedModifiers.Add(GetSpeedModifier);
    }

    protected override void OnDeactivate()
    {
        Player.GameObject.transform.localScale = m_OriginalScale;
        if (Player.Health != null) Player.Health.MaxHealthModifiers.Remove(GetHealthBonus);
    }

    private int GetHealthBonus() => m_Def.BonusHealth;
    private float GetSpeedModifier() => m_Def.SpeedMultiplier - 1.0f;
}`,
  projectileClash: `// NetworkProjectile.cs - Active Defense Collision clashing checks
private void OnTriggerEnter(Collider other)
{
    if (!IsServer) return;

    var health = other.GetComponentInParent<NetworkHealth>();
    if (health != null && health.OwnerClientId == m_ShooterId.Value) return;

    NetworkProjectile otherProj = other.GetComponent<NetworkProjectile>();
    if (otherProj != null)
    {
        if (!otherProj.IsSpawned) return;
        if (m_ShooterId.Value == otherProj.m_ShooterId.Value) return;

        float mySize = m_SizeScale.Value;
        float otherSize = otherProj.GetCurrentSize();
        float sizeDiff = mySize - otherSize;

        if (Mathf.Abs(sizeDiff) < 0.05f)
        {
            if (NetworkObjectId < otherProj.NetworkObjectId)
            {
                SpawnClashVfxRpc(transform.position, mySize);
            }
            DespawnBullet("Mutual Clash");
        }
        else if (sizeDiff < 0)
        {
            SpawnClashVfxRpc(transform.position, mySize);
            DespawnBullet("Smaller Clash");
        }
        return;
    }
    // Handle player hit and block check ...
}`
,
  enhancedMovement: `// EnhancedMovement.cs - Continuous Slow-Mo and Coroutine Abilities
public void EnergyStart()
{
    if (m_CurrentEnergy >= m_SlowMotionEnergyCost)
    {
        m_EnergyIsIncreasing = false;
        if (m_CIncreaseEnergy != null) StopCoroutine(m_CIncreaseEnergy);
        m_EnergyIsDecreasing = true;
        m_CDecreaseEnergy = StartCoroutine(C_DecreaseEnergyContinuous(m_SlowMotionEnergyReduceFactor));
        m_EPlayerEnterEnergy.Raise(); // Decoupled Event Raise
    }
}

private IEnumerator C_Dash(Vector2 direction)
{
    ExitEnergy();
    m_TrailLength.StartTrail(0.2f);
    m_EPlayerOnDash.Raise();
    DecreaseEnergyInstant(m_DashEnergyCost);

    float moveDir = m_Movement.GetInMove();
    m_Movement.SetInMove(0); // Zero velocity to keep dash consistent
    yield return new WaitForFixedUpdate();
    m_Movement.m_RB.AddForce(direction * m_DashStrength, ForceMode2D.Impulse);
    yield return new WaitForSeconds(m_DashDuration);
    m_Movement.SetInMove(moveDir);
    m_TrailLength.StopTrail();
}`,
  gameEvent: `// GameEvent.cs - ScriptableObject Event Broadcaster
[CreateAssetMenu(menuName = "GameEvent")]
public class GameEvent : ScriptableObject
{
    private List<GameEventHandler> listeners = new List<GameEventHandler>();

    public void Raise()
    {
        for (int i = listeners.Count - 1; i >= 0; i--)
        {
            listeners[i].OnEventRaised(this);
        }
    }

    public void RegisterListener(GameEventHandler listener)
    {
        if (!listeners.Contains(listener)) listeners.Add(listener);
    }

    public void UnregisterListener(GameEventHandler listener)
    {
        if (listeners.Contains(listener)) listeners.Remove(listener);
    }
}`,
  playerController: `// PlayerController.cs - Decoupled Input System Listener
private void OnEnable()
{
    m_ActionMap.Enable();
    m_ActionMap.Default.Enable();
    m_ActionMap.UI.Disable();

    m_ActionMap.Default.EnergyStart.performed += Handle_EnergyStartPerformed;
    m_ActionMap.Default.EnergyStart.canceled += Handle_EnergyStartCancelled;
    m_ActionMap.Default.DashRight.performed += Handle_DashRightPerformed;
    m_ActionMap.Default.SuperJump.performed += Handle_SuperJumpPerformed;

    m_HealthComponent.onDead += Handle_OnDead;
}

private void Handle_EnergyStartPerformed(InputAction.CallbackContext context)
{
    m_EnhancedMovement.EnergyStart();
    m_InEnergy = true;
}

public void DisablePlayerMovement()
{
    m_ActionMap.Default.Disable();
    m_ActionMap.UI.Enable(); // Swap action maps authoritatively
}`
};

const DIAGRAMS = [
  { 
    id: 'observer-lifecycle', 
    label: 'Observer Channel & Lifecycle', 
    src: 'images/documentation/image4.png', 
    desc: 'UML representation displaying the event-driven Observer SO Channel architecture and the Round Lifecycle transitions. Event channels (PlayerCameraChannelSO, RoundLifecycleManager) handle decouple communication between broadcasters and listeners. ScriptableObject channels register and deregister dynamically, keeping performance decoupled and synchronized across connected brawlers.' 
  },
  { 
    id: 'strategy', 
    label: 'Strategy Powerup Config', 
    src: 'images/documentation/image5.png', 
    desc: 'The dynamic Strategy Pattern implementation for player buffs. Behaviors are encapsulated in interchangeable classes inheriting from PowerUpEffect (defining OnEquip/OnUnequip lifecycles). Game balancing variables are stored in ScriptableObject definitions (e.g. GiantPowerUpDefinition) and edited directly in the Unity Inspector. When a player receives a power-up, the SO data is injected into the strategy instance, cleanly decoupling editor-time balancing from runtime logic.' 
  },
  { 
    id: 'arch', 
    label: 'Network Authority Flow', 
    src: 'images/documentation/image6.png', 
    desc: 'authoritative network model implemented using Unity Netcode for GameObjects (NGO). Player inputs and gameplay events (damage application, parry timing) are sent to the server via ServerRpc. The server validates physics and health states, then synchronizes results back to all clients using NetworkVariables (for state updates like health bars) and ClientRpc (for transient feedback like particle effects and sound cues).' 
  }
];

const PLATFORMER_DIAGRAMS = [
  { 
    id: 'plat-input-arch', 
    label: 'Input & Event Architecture', 
    src: 'images/documentation/platformer_class_diagram.png', 
    desc: 'UML class diagram displaying the event-driven system architecture. ScriptableObject-based GameEvents and localized GameEventHandlers allow decoupled communication between broadcasters (like the player) and listeners (such as managers and UI components).' 
  },
  { 
    id: 'plat-death-flow', 
    label: 'Hazard & Death Flow', 
    src: 'images/documentation/platformer_death_flow.png', 
    desc: 'Sequence diagram displaying life cycle execution upon hazard detection. When the Player controller hits a SpikeTrap, the HealthComponent registers damage. If health drops to zero, a PlayerOnDeath event is fired, triggering respawn and UI update logic across managers.' 
  },
  { 
    id: 'plat-activity-design', 
    label: 'Multiplicative Mechanic Design', 
    src: 'images/documentation/platformer_activity_diagram.png', 
    desc: 'Activity diagram detailing conditional evaluation of enhanced movement actions. When slow-motion (Energy state) is active, physical inputs are transformed into Super Jump, Dash, or Slam, consuming fixed amounts of the player\'s energy pool.' 
  }
];

const FORGIVENESS_DIAGRAMS = [
  { 
    id: 'plat-coyote-time', 
    label: 'Coyote Time Mechanics', 
    src: 'images/documentation/coyote_time.png', 
    desc: 'Visualizes the Coyote Time window. When the character walks off a ledge without jumping, the grounded sensor disables, but a coyote time timer begins. If the jump button is pressed during this brief window, the jump executes successfully, preventing frustration from late inputs.' 
  },
  { 
    id: 'plat-jump-buffering', 
    label: 'Jump Buffering Mechanics', 
    src: 'images/documentation/jump_buffering.png', 
    desc: 'Illustrates the Jump Buffering input tolerance. Pressing the jump button milliseconds before colliding with the ground buffers the input. Upon landing, the buffered jump triggers instantly, ensuring smooth, continuous jumps without needing frame-perfect timing.' 
  },
  { 
    id: 'plat-anti-gravity', 
    label: 'Anti-Gravity Jump Apex', 
    src: 'images/documentation/anti_gravity_apex.png', 
    desc: 'Shows the Anti-Gravity Apex modification. At the height of the jump curve, gravity scale is dynamically reduced and horizontal speed is slightly modified to float the player, offering extra frames of fine aerial maneuverability.' 
  },
  { 
    id: 'plat-speed-apex', 
    label: 'Speed Apex Modifier', 
    src: 'images/documentation/speed_apex_modifier.png', 
    desc: 'Details the Speed Apex modifier mechanism. Rewards perfect jumps by adding a slight horizontal speed boost when entering the apex window, providing extra momentum to reach far ledges.' 
  },
  { 
    id: 'plat-variable-jump', 
    label: 'Variable Jump Strength', 
    src: 'images/documentation/variable_jump_strength.png', 
    desc: 'Outlines Variable Jump Strength. The controller applies upward velocity dynamically. Releasing the jump button early applies an active downward deceleration force, allowing player-controlled jump heights.' 
  },
  { 
    id: 'plat-corner-clip', 
    label: 'Bumped Head & Corner Clipping', 
    src: 'images/documentation/bumped_head_correction.png', 
    desc: 'Visualizes the Bumped Head Correction. If the player jumps and their bounding box collides with the lower corner of a ceiling/ledge, the physics engine applies a lateral offset to slide them around the obstacle instead of stopping upward velocity.' 
  }
];

const CODE_EXPLANATIONS = {
  powerUpEffect: {
    title: "Base Power-Up Abstraction Class",
    concept: "Strategy Pattern Interface",
    description: "This abstract base class establishes the lifecycle contract for all power-up effects in the game. It provides concrete methods for equipping and unequipping to cache references, while forcing inheriting classes to define activation and deactivation behaviors.",
    points: [
      "Defines OnEquip() and OnUnequip() to handle caching and cleanup.",
      "Uses abstract OnActivate() and OnDeactivate() methods to implement custom behaviors.",
      "Enables the PlayerPowerUpController to stack and manage list modifiers without checking specific types."
    ]
  },
  giantPowerUp: {
    title: "Concrete Giant Power-Up Strategy",
    concept: "Data-Driven Balancing SO",
    description: "Shows a concrete strategy implementation. The definition script creates a ScriptableObject asset menu, storing variables like ScaleMultiplier, SpeedMultiplier, and BonusHealth. The effect class overrides OnActivate to scale the player, inject health modifiers, and apply server-validated healing.",
    points: [
      "Exposes properties directly in the editor for designer-friendly balance tweaking.",
      "Dynamically appends scale, speed, and health bonuses to the player references.",
      "Implements server-authoritative healing (IsServer check) to prevent cheat exploits."
    ]
  },
  projectileClash: {
    title: "Network Projectile Collision & Clashing",
    concept: "Active Defense Physics Validation",
    description: "Determines authoritative projectile collisions. When two bullets collide, the server calculates their relative sizes. Identical projectiles cancel out; however, if a player possesses a bullet size modifier, their larger projectile destroys the smaller one and continues on its trajectory.",
    points: [
      "Performs math comparison with float tolerance checks to guarantee stable network sync.",
      "Converts offensive projectile bullets into active shields based on relative sizing.",
      "Optimizes performance by invoking ClientRpc (SpawnClashVfxRpc) only when necessary."
    ]
  },
  enhancedMovement: {
    title: "Enhanced Movement & Resource Depletion",
    concept: "Coroutine-Based Ability Lifecycle",
    description: "Manages state-bound coroutines to coordinate slow-motion speed modifiers, trail effects, and instant physics additions. Energy depletion continuously drains the pool and automatically exits the state at zero.",
    points: [
      "Stops recovery loops and runs C_DecreaseEnergyContinuous for smooth draining.",
      "Calculates instant physics impulses and preserves original velocities.",
      "Integrates post-effects like motion trails and audio events via SO triggers."
    ]
  },
  gameEvent: {
    title: "ScriptableObject Event Channels",
    concept: "Decoupled ScriptableObject Observer Pattern",
    description: "Allows assets in the project window to serve as global event signals. Broadcasters raise events without direct class references to listening managers, creating zero direct coupling.",
    points: [
      "Broadcasters call Raise() directly on the ScriptableObject reference.",
      "Listeners use GameEventHandler to bind callbacks visually inside the Inspector.",
      "Eliminates dependency references between the Player, UI, and audio systems."
    ]
  },
  playerController: {
    title: "Input Decoupling & Action Swapping",
    concept: "Unity New Input System Controller",
    description: "Reads user controls from unified action maps and redirects instructions. Swaps between UI controls and platforming controls authoritatively when player health components trigger death events.",
    points: [
      "Binds delegate functions directly to performed/canceled action states.",
      "Swaps action maps dynamically using DisablePlayerMovement() upon death.",
      "Shields character movement logic from direct input polling loops."
    ]
  }
};

const PROJECT_DATA = {
  'project-knockout': {
    title: 'KNOCK OUT',
    subtitle: 'MULTIPLAYER HEX BRAWLER',
    desc: 'A fast-paced, top-down multiplayer hex brawler built using Unity and Netcode for GameObjects. Features fully server-authoritative physics, crumbling hexagonal arenas, and game-changing catch-up power-ups.',
    tech: ['Unity 3D', 'C#', 'NGO Netcode', 'UI Toolkit', 'Proximity Audio'],
    controls: [
      { action: 'Move Brawler', key: 'W A S D', pad: 'Left Stick' },
      { action: 'Aim Reticle', key: 'Mouse Direction', pad: 'Right Stick' },
      { action: 'Fire Projectile', key: 'Left Mouse Button', pad: 'West Button / Right Trigger' },
      { action: 'Parry / Block', key: 'Right Mouse Button', pad: 'North Button / Left Shoulder' },
      { action: 'Melee Strike', key: 'C', pad: 'East Button / Right Shoulder' },
      { action: 'Jump', key: 'Spacebar', pad: 'South Button' }
    ]
  },
  'neon-drifter': {
    title: 'NEON DRIFTER',
    subtitle: 'ARCADE RACER PROJECT',
    desc: 'A fast-paced neon-lit arcade racer focusing on drift dynamics, custom suspension calculations, and dynamic track rendering.',
    tech: ['Unreal Engine', 'C++', 'Chaos Physics', 'UI Design']
  },
  '2d-platformer': {
    title: '2D PLATFORMER',
    subtitle: 'ENERGY-DRIVEN PLATFORMER',
    desc: 'A fast-paced Unity 2D platformer built using C# and the new Input System. Features a slow-motion energy resource management system, coyote time jump physics, variable gravity at jump apex, and decoupled ScriptableObject event architectures.',
    tech: ['Unity 2D', 'C#', 'New Input System', 'Cinemachine', 'Post-Processing'],
    controls: [
      { action: 'Move Horizontal', key: 'A / D', pad: 'Left Stick' },
      { action: 'Jump', key: 'Space', pad: 'South Button (A/Cross)' },
      { action: 'Crouch', key: 'S / Down Arrow', pad: 'Left Stick Down / L3' },
      { action: 'Energy / Slow-Mo', key: 'Shift (Hold)', pad: 'Right Trigger' },
      { action: 'Super Jump', key: 'Energy + Space', pad: 'Energy + South Button' },
      { action: 'Dash', key: 'Energy + A / D', pad: 'Energy + D-Pad / Stick' },
      { action: 'Slam', key: 'Energy + S (Mid-air)', pad: 'Energy + Down' }
    ]
  }
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeCodeTab, setActiveCodeTab] = useState('powerUpEffect');
  const [selectedDiagram, setSelectedDiagram] = useState(0);
  const [isDiagramZoomed, setIsDiagramZoomed] = useState(false);
  const [diagramScale, setDiagramScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [forgivenessActive, setForgivenessActive] = useState(false);
  const dragOccurred = useRef(false);
  const containerRef = useRef(null);

  // Scroll to top when project page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset zoom settings when lightbox closes/opens
  useEffect(() => {
    if (!isDiagramZoomed) {
      setDiagramScale(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [isDiagramZoomed]);

  // Global window listeners for drag panning
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      let boundX = 0;
      let boundY = 0;
      
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        // Max pan is half of the overflowed dimensions of the zoomed image
        boundX = (clientWidth * (diagramScale - 1)) / 2;
        boundY = (clientHeight * (diagramScale - 1)) / 2;
      } else {
        // Fallback bounds
        boundX = 400 * (diagramScale - 1);
        boundY = 250 * (diagramScale - 1);
      }
      
      const clampedX = Math.max(-boundX, Math.min(boundX, dx));
      const clampedY = Math.max(-boundY, Math.min(boundY, dy));
      
      setPanOffset({ x: clampedX, y: clampedY });
      dragOccurred.current = true;
    };

    const onMouseUp = () => {
      setIsDragging(false);
      setTimeout(() => {
        dragOccurred.current = false;
      }, 50);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e) => {
    if (diagramScale <= 1) return;
    e.preventDefault();
    dragOccurred.current = false;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  // Normalize ID
  const normId = id ? id.replace('project-project-', 'project-') : '';
  const project = PROJECT_DATA[normId] || {
    title: 'PROJECT DETAIL',
    subtitle: 'UNKNOWN OBJECT',
    desc: 'This project briefing has been encrypted or is under construction. Please check back later.',
    tech: []
  };

  const isKnockOut = normId === 'project-knockout';
  const baseUrl = import.meta.env.BASE_URL;

  // Global Floating Star Logo to go back
  const floatingLogo = (
    <div 
      onClick={() => navigate('/')} 
      className="p5-fixed-star"
      style={{ 
        position: 'fixed', 
        top: '20px', 
        left: '20px', 
        zIndex: 1000, 
        cursor: 'pointer' 
      }}
    >
      <AJStar size={75} />
    </div>
  );

  const isPlatformer = normId === '2d-platformer';

  // Set default active tab depending on project loaded
  useEffect(() => {
    if (isPlatformer) {
      setActiveCodeTab('enhancedMovement');
    } else {
      setActiveCodeTab('powerUpEffect');
    }
    // Also reset selected diagram when switching projects
    setSelectedDiagram(0);
  }, [isPlatformer]);

  const activeDiagramList = isPlatformer ? PLATFORMER_DIAGRAMS : DIAGRAMS;
  const currentDiagList = forgivenessActive ? FORGIVENESS_DIAGRAMS : activeDiagramList;

  if (!isKnockOut && !isPlatformer) {
    // Default View for non-Knockout projects (Neon Drifter)
    return (
      <div className="page-container" style={{ padding: '80px 20px' }}>
        {floatingLogo}
        <div style={{ marginBottom: '30px', marginTop: '20px' }}>
          <P5RansomText text={project.title} sizeMultiplier={1.5} />
        </div>
        <div className="p5-stats-panel" style={{ maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
          <h2 style={{ fontFamily: 'var(--font-p5-hand)', fontSize: '2.5rem', color: 'var(--p5-yellow)', marginBottom: '15px' }}>
            {project.subtitle}
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '25px' }}>
            {project.desc}
          </p>
          <h3 style={{ fontSize: '1.3rem', borderBottom: '2px solid var(--p5-red)', paddingBottom: '5px', marginBottom: '15px' }}>
            ENGINE & SYSTEMS USED
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
            {project.tech.map((t, idx) => (
              <span key={idx} style={{ background: 'var(--p5-red)', padding: '5px 15px', transform: 'skewX(-10deg)', fontWeight: 'bold' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Multi-section high-fidelity scrolling layout for Knock Out
  return (
    <div className="p5-doc-page">
      {floatingLogo}
      
      {/* Top Hero Banner */}
      <section className="p5-doc-hero" style={{ paddingTop: '100px' }}>
        <div className="p5-doc-hero-content">
          <div className="p5-p5hatty-title">{project.title}</div>
          <h2 className="p5-doc-subtitle">{project.subtitle}</h2>
          <p className="p5-doc-desc">{project.desc}</p>
          
          <div className="p5-doc-tech-row">
            {project.tech.map((t, idx) => (
              <span key={idx} className="p5-doc-tech-badge">{t}</span>
            ))}
          </div>
        </div>
        <div className="p5-doc-hero-visual">
          <img 
            src={`${baseUrl}${isPlatformer ? 'images/documentation/platformer_main_screenshot.png' : 'images/documentation/KnockOutShowcaseImage.png'}`} 
            alt={isPlatformer ? "2D Platformer Gameplay Showcase" : "Knock Out Showcase"} 
            className="p5-doc-main-img" 
          />
          <div className="p5-doc-img-label">
            {isPlatformer ? "2D PLATFORMER GAMEPLAY SHOWCASE" : "OFFICIAL KNOCK OUT GAMEPLAY SHOWCASE"}
          </div>
        </div>
      </section>
      {/* Gameplay Video Showcase */}
      <section className="p5-doc-section light-sec" style={{ paddingBottom: '40px' }}>
        <div className="p5-sec-header red-header">
          <span>GP</span> GAMEPLAY VIDEO SHOWCASE
        </div>
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
          height: 0,
          overflow: 'hidden',
          maxWidth: '100%',
          border: '4px solid var(--p5-black)',
          boxShadow: '10px 10px 0 var(--p5-red)',
          backgroundColor: '#000'
        }}>
          <iframe
            src={isPlatformer ? "https://www.youtube.com/embed/zFtYdpY783o" : "https://www.youtube.com/embed/p6i66cxAxuo"}
            title={isPlatformer ? "2D Platformer Gameplay Showcase" : "Knock Out Gameplay Showcase"}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* 1. Inspiration and Research Section */}
      <section className="p5-doc-section dark-sec">
        <div className="p5-sec-header">
          <span>01</span> INSPIRATION & RESEARCH
        </div>
        {isPlatformer ? (
          <div className="p5-sec-grid">
            <div className="p5-sec-left">
              <p>
                In high-speed 2D platforming, tight reflex loops dictate player success. Traditional platformers run at real-time speeds, which can create high cognitive friction for players navigating complex hazards. The core input modifier and mobility mechanics are inspired by <strong>Naruto Shippuden: Ultimate Ninja Storm 4</strong>, which utilizes a dedicated "Chakra" modifier button to elevate standard actions into high-potency variants.
              </p>
              <p style={{ marginTop: '15px' }}>
                <strong>Slow-Mo Mechanics:</strong> Holding the Energy button triggers a slow-motion matrix effect. This provides players with extra frames to analyze trap patterns, time jumps, and aim dashes dynamically.
              </p>
              <p style={{ marginTop: '15px' }}>
                <strong>Resource Management:</strong> To prevent players from abuse, slow-motion drains the energy pool continuously. Depleting the pool completely halts enhanced abilities, transforming slow-motion from a passive assistance tool into an active tactical resource.
              </p>
              <div style={{ marginTop: '20px', borderTop: '1px dashed var(--p5-red)', paddingTop: '15px' }}>
                <strong style={{ color: 'var(--p5-yellow)', display: 'block', marginBottom: '8px' }}>ENGINEERED FORGIVENESS MECHANICS:</strong>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                  To deliver a satisfying and responsive character feel, the controller implements several dedicated mathematical adjustments:
                </p>
                <ul style={{ paddingLeft: '20px', marginTop: '8px', fontSize: '0.9rem', lineHeight: '1.6', color: '#ccc' }}>
                  <li><strong>Coyote Time:</strong> Retains a brief frame window allowing the player to jump after slipping off solid ground.</li>
                  <li><strong>Jump Buffering:</strong> Pre-registers and fires jump inputs triggered milliseconds prior to landing.</li>
                  <li><strong>Anti-Gravity Apex:</strong> Scales gravity down dynamically at the jump peak to extend aerial precision.</li>
                  <li><strong>Speed Apex Modifier:</strong> Grants a minor speed boost at the apex to reward accurate leaps.</li>
                  <li><strong>Bumped Head Correction / Corner Clipping:</strong> Offsets lateral coordinates if a jump collision overlaps ceilings, sliding the player around obstructions instead of losing velocity.</li>
                  <li><strong>Variable Jump Strength:</strong> Modifies jump force dynamically relative to input hold duration.</li>
                </ul>
              </div>
            </div>
            <div className="p5-sec-right">
              <div className="p5-card-skew">
                <img src={`${baseUrl}images/documentation/platformer_death_flow.png`} alt="Spike Trap Sequence Diagram" className="p5-card-img" />
                <div className="p5-card-caption">Analysis: Hazard damage and event-driven death flow.</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p5-sec-grid">
            <div className="p5-sec-left">
              <p>
                In multiplayer game design, balancing mechanics differs drastically from single-player equivalents. While single-player rogue-lites (like <em>Hades</em> or <em>Dead Cells</em>) focus on long runs where buffs slowly drip-feed the player, multiplayer matches built for quick bursts require <strong>mechanic-changing power-ups</strong> to avoid stale gameplay.
              </p>
              <p style={{ marginTop: '15px' }}>
                <strong>ROUNDS (Landfall):</strong> Serves as a primary reference. It uses power-ups that alter fundamental weapon mechanics (e.g., transforming a base pistol into a shotgun). This changes play styles instantly. However, ROUNDS suffers from potential stalemate camping where no hazards force the end of a round.
              </p>
              <p style={{ marginTop: '15px' }}>
                <strong>Fortnite (Epic Games):</strong> Fortnite solves spatial camping by systematically pushing players inward with its "Storm" volume. In Knock Out, this concept is translated to outer hexagonal floor tiles crumbling into instant-death lava.
              </p>
              <p style={{ marginTop: '15px' }}>
                <strong>Among Us (Innersloth):</strong> Keeps dead players engaged by turning them into interactive ghosts. Spectator modes in Knock Out are adapted to give eliminated brawlers full camera freedom and strategic visualization.
              </p>
            </div>
            <div className="p5-sec-right">
              <div className="p5-card-skew">
                <img src={`${baseUrl}images/documentation/PowerUpShuffle.gif`} alt="Power-up card selection interface" className="p5-card-img" />
                <div className="p5-card-caption">Gameplay: Random card draft selection interface.</div>
              </div>
              <div className="p5-card-skew" style={{ marginTop: '20px', transform: 'rotate(-2deg)' }}>
                <img src={`${baseUrl}images/documentation/GhostMode.png`} alt="Spectator mode overview" className="p5-card-img" />
                <div className="p5-card-caption">Feature: Spectator ghost mode visualization.</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. Multiplicative Mechanic Design Section */}
      <section className="p5-doc-section light-sec">
        <div className="p5-sec-header red-header">
          <span>02</span> MULTIPLICATIVE MECHANIC DESIGN
        </div>
        <p className="section-intro">
          {isPlatformer 
            ? "To design a rich player toolkit without overloading keyboard real estate, standard movement features expand with energy modifiers."
            : "To raise the skill ceiling without bloating inputs, overlapping mechanics are engineered to serve multiple tactical purposes."
          }
        </p>
        {isPlatformer ? (
          <div className="p5-multiplicative-grid">
            <div className="p5-mech-card">
              <h4>ENERGY AS A GATEWAY MODIFIER</h4>
              <p>The Energy trigger alters speed but does not perform independent motion actions. Instead, holding it modifies the entire basic toolkit: a jump becomes a high-altitude Super Jump, movement maps to a high-speed Dash, and fall states translate to a Slam.</p>
            </div>
            <div className="p5-mech-card">
              <h4>SLAM AS MOBILITY & ENVIRONMENTAL INTERACTION</h4>
              <p>Triggering Slam launches the player downwards rapidly. While useful as a safety measure to quickly return to the ground or dodge spike hazards, it simultaneously broadcasts an m_EPlayerSlamCollision event, activating pressure plates and triggering environmental reactions.</p>
            </div>
            <div className="p5-mech-card">
              <h4>VARIABLE APEX GRAVITY</h4>
              <p>Standard jumping automatically calculates the jump height. At the peak apex, the system dynamically decreases the gravity scale. This floats the player slightly, providing crucial frames of aerial drift control without using energy.</p>
            </div>
            <div className="p5-mech-card">
              <h4>FORGIVING COYOTE TIME & JUMP BUFFERING</h4>
              <p>Physics sensors utilize stateful polling to cache grounded statuses. If a player walks off a ledge, a short coyote timer still allows jump execution. Jump inputs registered milliseconds before landing buffer and fire immediately upon touch.</p>
            </div>
          </div>
        ) : (
          <div className="p5-multiplicative-grid">
            <div className="p5-mech-card">
              <h4>PARRY AS OFFENSIVE CONTROL</h4>
              <p>Blocking is generally a defensive action. By equipping a Parry Power-up, timed blocks release a network shockwave carrying extreme physics knockback. Defensive blocking transforms into offensive crowd control.</p>
            </div>
            <div className="p5-mech-card">
              <h4>PROJECTILE CLASH AS ACTIVE SHIELDING</h4>
              <p>Projectiles clash in mid-air. Bullet size modifiers check relative scale on triggers. A larger projectile destroys smaller incoming ones while maintaining its trajectory, acting as a skill-based active shield.</p>
            </div>
            <div className="p5-mech-card">
              <h4>MELEE & ENVIRONMENT LETHALITY</h4>
              <p>Melee acts as a high-knockback tool rather than pure damage. Coupled with crumbling hexagonal tiles, players use melee tactically to push opponents into the surrounding instant-kill lava.</p>
            </div>
            <div className="p5-mech-card">
              <h4>POISON CLOUDS FOR AREA DENIAL</h4>
              <p>Poison cards trigger damage-over-time clouds. Designers or players use these to restrict routes on a shrinking arena, herding opponents towards hazard boundaries.</p>
            </div>
          </div>
        )}
      </section>

      {/* 3. System Architecture & UML Flow Diagrams */}
      <section className="p5-doc-section dark-sec">
        <div className="p5-sec-header">
          <span>03</span> SYSTEM INTERACTION & DIAGRAMS
        </div>
        <p className="section-intro">
          {isPlatformer 
            ? "Decoupled, modular code design allows clean scalability. Systems are modeled using the event-driven Observer pattern and independent controller abstraction mappings. Click any diagram below to inspect it in full screen detail."
            : "Decoupled, modular code design allows clean scalability with netcode. Systems are modeled using the Observer, Strategy, and Server-Authoritative Netcode patterns. Click any diagram below to inspect it in full screen detail."
          }
        </p>

        {/* Diagram Interactive Gallery */}
        <div className="p5-diagrams-gallery">
          <div className="p5-diagram-tabs">
            {activeDiagramList.map((diag, index) => (
              <button
                key={diag.id}
                onClick={() => setSelectedDiagram(index)}
                className={`p5-diagram-tab ${selectedDiagram === index ? 'active' : ''}`}
              >
                {diag.label}
              </button>
            ))}
          </div>
          
          <div className="p5-diagram-display">
            <div 
              className="p5-diag-image-wrapper clickable-diagram-wrapper"
              onClick={() => {
                setForgivenessActive(false);
                setIsDiagramZoomed(true);
              }}
              title="Click to view full size"
            >
              <img src={`${baseUrl}${activeDiagramList[selectedDiagram]?.src}`} alt={activeDiagramList[selectedDiagram]?.label} />
              <div className="p5-diagram-zoom-indicator">
                <span className="zoom-icon">🔍</span> Click to Expand
              </div>
            </div>
            <div className="p5-diag-meta">
              <h5>{activeDiagramList[selectedDiagram]?.label} Architecture</h5>
              <p>{activeDiagramList[selectedDiagram]?.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Diagram Lightbox Overlay */}
      {isDiagramZoomed && (
        <div 
          className="p5-diagram-lightbox"
          onClick={() => {
            if (!dragOccurred.current) {
              setIsDiagramZoomed(false);
            }
          }}
        >
          <div className="p5-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button className="p5-lightbox-close" onClick={() => setIsDiagramZoomed(false)}>×</button>
            <div 
              ref={containerRef}
              className="p5-lightbox-img-wrapper" 
              style={{ 
                overflow: 'hidden', 
                cursor: diagramScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                position: 'relative',
                height: '60vh'
              }}
              onMouseDown={handleMouseDown}
            >
              <img 
                src={`${baseUrl}${currentDiagList[selectedDiagram]?.src}`} 
                alt={currentDiagList[selectedDiagram]?.label} 
                draggable="false"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${diagramScale})`,
                  transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.19, 1, 0.22, 1)',
                  pointerEvents: 'none', // Prevent default image dragging behavior
                  userSelect: 'none',
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
              />
              
              {/* Dedicated Zoom Control Panel */}
              <div 
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  display: 'flex',
                  gap: '8px',
                  zIndex: 10
                }}
              >
                <button 
                  onClick={() => setDiagramScale(prev => Math.min(prev + 0.5, 4))}
                  style={{
                    backgroundColor: 'var(--p5-black)',
                    color: 'var(--p5-white)',
                    border: '2px solid var(--p5-white)',
                    padding: '5px 12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-p5-menu)'
                  }}
                  title="Zoom In"
                >
                  ZOOM +
                </button>
                <button 
                  onClick={() => {
                    setDiagramScale(prev => {
                      const newScale = Math.max(prev - 0.5, 1);
                      if (newScale === 1) setPanOffset({ x: 0, y: 0 });
                      return newScale;
                    });
                  }}
                  style={{
                    backgroundColor: 'var(--p5-black)',
                    color: 'var(--p5-white)',
                    border: '2px solid var(--p5-white)',
                    padding: '5px 12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-p5-menu)'
                  }}
                  title="Zoom Out"
                >
                  ZOOM -
                </button>
                <button 
                  onClick={() => {
                    setDiagramScale(1);
                    setPanOffset({ x: 0, y: 0 });
                  }}
                  style={{
                    backgroundColor: 'var(--p5-red)',
                    color: 'var(--p5-white)',
                    border: '2px solid var(--p5-white)',
                    padding: '5px 12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-p5-menu)'
                  }}
                  title="Reset Zoom"
                >
                  RESET
                </button>
              </div>

              <div 
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  padding: '5px 12px',
                  fontSize: '0.85rem',
                  border: '1px solid var(--p5-white)',
                  color: 'var(--p5-yellow)',
                  pointerEvents: 'none',
                  fontFamily: 'var(--font-p5-body)',
                  zIndex: 10
                }}
              >
                {diagramScale > 1 ? 'Drag to Pan' : 'Use controls in top-left to Zoom'}
              </div>
            </div>
            <div className="p5-lightbox-caption">
              <h4>{currentDiagList[selectedDiagram]?.label} Architecture</h4>
              <p>{currentDiagList[selectedDiagram]?.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3.5. Forgiveness Mechanics Visualization Section (Platformer Only) */}
      {isPlatformer && (
        <section className="p5-doc-section dark-sec" style={{ borderTop: '4px solid var(--p5-red)', marginTop: '40px' }}>
          <div className="p5-sec-header">
            <span>04</span> FORGIVENESS MECHANICS VISUALIZATION
          </div>
          <p className="section-intro">
            A visual breakdown of the mathematical tolerance adjustments implemented in the character controller to ensure tight, satisfying, and responsive player control. Click any card to expand it in full screen details.
          </p>
          <div className="p5-multiplicative-grid" style={{ marginTop: '30px' }}>
            {FORGIVENESS_DIAGRAMS.map((diag, index) => (
              <div 
                key={diag.id}
                className="p5-mech-card clickable-diagram-wrapper"
                onClick={() => {
                  setForgivenessActive(true);
                  setSelectedDiagram(index);
                  setIsDiagramZoomed(true);
                }}
                style={{
                  cursor: 'pointer',
                  border: '2px solid var(--p5-white)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ 
                    height: '140px', 
                    overflow: 'hidden', 
                    backgroundColor: '#000', 
                    border: '2px solid var(--p5-black)', 
                    marginBottom: '12px',
                    position: 'relative'
                  }}>
                    <img 
                      src={`${baseUrl}${diag.src}`} 
                      alt={diag.label} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-p5-header)', color: 'var(--p5-yellow)', fontSize: '1.2rem', marginBottom: '8px' }}>
                    {diag.label}
                  </h4>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#ccc' }}>
                    {diag.desc}
                  </p>
                </div>
                <div style={{ 
                  marginTop: '12px', 
                  fontSize: '0.8rem', 
                  color: 'var(--p5-red)', 
                  fontWeight: 'bold',
                  textAlign: 'right'
                }}>
                  CLICK TO ZOOM ▲
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Interactive C# Code Codeblocks */}
      <section className="p5-doc-section light-sec">
        <div className="p5-sec-header red-header">
          <span>{isPlatformer ? '05' : '04'}</span> SYSTEM CODEBLOCKS & IMPLEMENTATION
        </div>
        <p className="section-intro">
          {isPlatformer 
            ? "This code segment exhibits a vertical slice of a consistent programming paradigm, showcasing coroutine-based enhanced movement controls and C# Event handler decoupling via ScriptableObjects."
            : "This code segment exhibits a vertical slice of a consistent programming paradigm, showcasing the strategy pattern implementation and network projectile clashing code running authoritatively on the server."
          }
        </p>

        {/* Code Tabs & Explanation Layout */}
        <div className="p5-code-container">
          <div className="p5-code-tabs">
            {isPlatformer ? (
              <>
                <button
                  onClick={() => setActiveCodeTab('enhancedMovement')}
                  className={`p5-code-tab ${activeCodeTab === 'enhancedMovement' ? 'active' : ''}`}
                >
                  EnhancedMovement.cs (Coroutines)
                </button>
                <button
                  onClick={() => setActiveCodeTab('gameEvent')}
                  className={`p5-code-tab ${activeCodeTab === 'gameEvent' ? 'active' : ''}`}
                >
                  GameEvent.cs (Events)
                </button>
                <button
                  onClick={() => setActiveCodeTab('playerController')}
                  className={`p5-code-tab ${activeCodeTab === 'playerController' ? 'active' : ''}`}
                >
                  PlayerController.cs (Input)
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveCodeTab('powerUpEffect')}
                  className={`p5-code-tab ${activeCodeTab === 'powerUpEffect' ? 'active' : ''}`}
                >
                  PowerUpEffect.cs (Base)
                </button>
                <button
                  onClick={() => setActiveCodeTab('giantPowerUp')}
                  className={`p5-code-tab ${activeCodeTab === 'giantPowerUp' ? 'active' : ''}`}
                >
                  GiantPowerUp.cs (Strategy)
                </button>
                <button
                  onClick={() => setActiveCodeTab('projectileClash')}
                  className={`p5-code-tab ${activeCodeTab === 'projectileClash' ? 'active' : ''}`}
                >
                  NetworkProjectile.cs (Clash)
                </button>
              </>
            )}
          </div>

          <div className="p5-code-flex-layout">
            <div className="p5-code-window">
              <div className="p5-code-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="file-name">
                  {activeCodeTab === 'powerUpEffect' ? 'PowerUpEffect.cs' 
                    : activeCodeTab === 'giantPowerUp' ? 'GiantPowerUp.cs' 
                    : activeCodeTab === 'projectileClash' ? 'NetworkProjectile.cs'
                    : activeCodeTab === 'enhancedMovement' ? 'EnhancedMovement.cs'
                    : activeCodeTab === 'gameEvent' ? 'GameEvent.cs'
                    : 'PlayerController.cs'}
                </span>
              </div>
              <pre className="p5-code-pre">
                <code>{CODE_SNIPPETS.highlightCSharpCode(CODE_SNIPPETS[activeCodeTab])}</code>
              </pre>
            </div>

            <div className="p5-code-explanation-card">
              <div className="p5-explanation-badge">{CODE_EXPLANATIONS[activeCodeTab]?.concept}</div>
              <h3>{CODE_EXPLANATIONS[activeCodeTab]?.title}</h3>
              <p className="explanation-desc">{CODE_EXPLANATIONS[activeCodeTab]?.description}</p>
              <div className="explanation-divider"></div>
              <h4>KEY ARCHITECTURAL TAKEAWAYS</h4>
              <ul className="explanation-points">
                {CODE_EXPLANATIONS[activeCodeTab]?.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Game Rules & Control Mapping */}
      <section className="p5-doc-section dark-sec">
        <div className="p5-sec-header">
          <span>05</span> GAME CONTROLS & RULES
        </div>
        <div className="p5-rules-grid">
          <div className="p5-rules-left">
            <h3 style={{ fontFamily: 'var(--font-p5-hand)', fontSize: '2rem', color: 'var(--p5-yellow)', marginBottom: '15px' }}>
              THE RULES OF ENGAGEMENT
            </h3>
            {isPlatformer ? (
              <ul className="p5-rules-list">
                <li><strong>Stateful Sensors:</strong> Ground checking is driven by StatefulBoxcastSensor2D, polling solid shapes frame-by-frame.</li>
                <li><strong>Forgiving Physics:</strong> Coyote time allows jumps up to 0.15s after leaving ledges; buffered inputs cache presses right before landing.</li>
                <li><strong>Health & Traps:</strong> Spikes deal damage. Reaching zero health raises PlayerOnDeath, notifying the GameManager to reset and respawn.</li>
                <li><strong>Energy Meter:</strong> Entering slow-motion time dilation continuously drains energy, requiring cooldown recovery intervals.</li>
              </ul>
            ) : (
              <ul className="p5-rules-list">
                <li><strong>The Crumbling Grid:</strong> Players fight on a hexagonal grid. Hexes shake and drop off as time goes on, forcing interaction.</li>
                <li><strong>Sudden Death:</strong> Triggered once only two players survive, changing the music and locking boundaries.</li>
                <li><strong>Catch-up Card Drafts:</strong> Winners secure points, but losers get immediate access to draw 1-of-5 power-up cards to permanently adapt.</li>
                <li><strong>Lobby Customization:</strong> Lobby hosts config victory thresholds (default 3 wins) and starting card counts.</li>
              </ul>
            )}
          </div>
          <div className="p5-rules-right">
            <h3 style={{ fontFamily: 'var(--font-p5-hand)', fontSize: '2rem', color: 'var(--p5-white)', marginBottom: '15px', textAlign: 'center' }}>
              CONTROLS LAYOUT
            </h3>
            <table className="p5-controls-table">
              <thead>
                <tr>
                  <th>ACTION</th>
                  <th>KEYBOARD</th>
                  <th>GAMEPAD</th>
                </tr>
              </thead>
              <tbody>
                {project.controls.map((c, idx) => (
                  <tr key={idx}>
                    <td>{c.action}</td>
                    <td className="kbd">{c.key}</td>
                    <td className="pad">{c.pad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Designer Expansion Guide */}
      <section className="p5-doc-section light-sec">
        <div className="p5-sec-header red-header">
          <span>06</span> DESIGNER EXPANSION BRIEF
        </div>
        <div className="p5-designer-guide">
          <h3>
            {isPlatformer ? "HOW TO DEPLOY GLOBAL EVENTS" : "HOW TO ADD NEW POWER-UPS"}
          </h3>
          {isPlatformer ? (
            <div className="p5-steps-grid">
              <div className="p5-step-card">
                <div className="p5-step-header">
                  <div className="step-num">01</div>
                  <h5>Create GameEvent Asset</h5>
                </div>
                <p>In the Unity Editor's Project panel, right-click and choose <code>Create &gt; GameEvent</code>. Name it representing the trigger event (e.g. <code>PlayerFoundSecret</code>).</p>
              </div>
              <div className="p5-step-card">
                <div className="p5-step-header">
                  <div className="step-num">02</div>
                  <h5>Serialize and Raise</h5>
                </div>
                <p>In the broadcasting script, declare a <code>[SerializeField] private GameEvent m_MyEvent;</code>. Call <code>m_MyEvent.Raise();</code> under the desired logic conditions.</p>
              </div>
              <div className="p5-step-card">
                <div className="p5-step-header">
                  <div className="step-num">03</div>
                  <h5>Attach local Event Handlers</h5>
                </div>
                <p>Attach the <code>GameEventHandler</code> component to any GameObject that needs to listen and respond (e.g. Door obstacles, UI Counters, sound mixers).</p>
              </div>
              <div className="p5-step-card">
                <div className="p5-step-header">
                  <div className="step-num">04</div>
                  <h5>Bind Inspector Responses</h5>
                </div>
                <p>Append a new event response item in the inspector list. Reference your event asset and use the visual UnityEvent callback block to invoke public class functions.</p>
              </div>
            </div>
          ) : (
            <div className="p5-steps-grid">
              <div className="p5-step-card">
                <div className="p5-step-header">
                  <div className="step-num">01</div>
                  <h5>Create ScriptableObject Asset</h5>
                </div>
                <p>Right-click in the project panel and navigate to <code>Create &gt; PowerUps &gt; [Select Desired Type]</code> (e.g. <code>Giant Transformation</code>).</p>
                <div className="p5-step-image">
                  <img src={`${baseUrl}images/documentation/image8.png`} alt="Create ScriptableObject Asset Menu" />
                </div>
              </div>

              <div className="p5-step-card">
                <div className="p5-step-header">
                  <div className="step-num">02</div>
                  <h5>Tweak Balancing Variables</h5>
                </div>
                <p>Select the newly created ScriptableObject. In the inspector, balance properties like <code>ScaleMultiplier</code>, <code>BonusHealth</code>, or <code>SpeedMultiplier</code> directly.</p>
                <div className="p5-step-image">
                  <img src={`${baseUrl}images/documentation/image9.png`} alt="Tweak Balancing Variables in Inspector" />
                </div>
              </div>

              <div className="p5-step-card">
                <div className="p5-step-header">
                  <div className="step-num">03</div>
                  <h5>Locate GameManager Selection Deck</h5>
                </div>
                <p>Locate the <code>GameManager</code> object in the GameScene. In the <code>PowerUpSelectionManager</code> component, find the <strong>All Power Ups</strong> deck list.</p>
                <div className="p5-step-image">
                  <img src={`${baseUrl}images/documentation/image10.png`} alt="Locate PowerUpSelectionManager" />
                </div>
              </div>

              <div className="p5-step-card">
                <div className="p5-step-header">
                  <div className="step-num">04</div>
                  <h5>Append and Assign the New SO</h5>
                </div>
                <p>Click the plus icon to duplicate the last element, then click the small circle target to choose and assign your new custom Power-Up definition asset.</p>
                <div className="p5-step-image">
                  <img src={`${baseUrl}images/documentation/image11.png`} alt="Assign the custom Power-Up Definition" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>



    </div>
  );
};

export default ProjectDetails;
