import os
import sys
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

# Margins and dimensions
PAGE_WIDTH, PAGE_HEIGHT = A4  # 595.2755737304688 x 841.8897705078125
ML = 48.0
MR = PAGE_WIDTH - 48.0
CONTENT_WIDTH = MR - ML  # 499.275

# Color Palette (Mitry Visuals Style)
BG_COLOR = (0.04, 0.04, 0.04)        # #0A0A0A (Dark Charcoal)
PANEL_BG = (0.07, 0.07, 0.07)        # #121212 (Dark Grey Panels)
GOLD = (0.83, 0.65, 0.45)            # #D3A572 (Bronze Gold highlight)
LINE_COLOR = (0.15, 0.15, 0.15)      # #262626 (Separator Lines)
TEXT_WHITE = (0.96, 0.98, 0.98)      # #F5FAFA (Primary Light Text)
TEXT_GREY = (0.66, 0.66, 0.66)       # #A8A8A8 (Secondary Medium Text)
TEXT_DARK = (0.42, 0.42, 0.42)       # #6B6B6B (Metadata/Dark Text)

def draw_background(c):
    c.setFillColorRGB(*BG_COLOR)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)

def draw_header_footer(c, page_num):
    # Top Header
    c.setLineWidth(0.5)
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML, 800.0, MR, 800.0)
    
    c.setFont("Times-Italic", 12.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML, 808.0, "EGYGRAFX")
    
    c.setFont("Courier", 8.0)
    c.setFillColorRGB(*TEXT_GREY)
    header_right = f"MV-2026-085  ·  B2B Platform Proposal  ·  p.{page_num - 1}"
    c.drawRightString(MR, 808.0, header_right)
    
    # Bottom Footer
    c.line(ML, 48.0, MR, 48.0)
    
    c.setFont("Courier", 7.5)
    c.setFillColorRGB(*TEXT_DARK)
    c.drawString(ML, 35.0, "MITRY VISUALS  ·  MI5A.COM  ·  CAIRO, EGYPT")
    c.drawRightString(MR, 35.0, "Valid Until: 24 June 2026")

def draw_paragraph(c, text, x, y, max_width, font_name, font_size, leading, color_rgb, alignment='left'):
    c.setFont(font_name, font_size)
    c.setFillColorRGB(*color_rgb)
    sub_paragraphs = text.split('\n')
    curr_y = y
    total_height = 0
    for sub in sub_paragraphs:
        words = sub.split(' ')
        lines = []
        current_line = []
        for word in words:
            test_line = ' '.join(current_line + [word])
            if c.stringWidth(test_line, font_name, font_size) < max_width:
                current_line.append(word)
            else:
                lines.append(' '.join(current_line))
                current_line = [word]
        if current_line:
            lines.append(' '.join(current_line))
            
        for line in lines:
            if alignment == 'left':
                c.drawString(x, curr_y, line)
            elif alignment == 'center':
                c.drawCentredString(x, curr_y, line)
            elif alignment == 'right':
                c.drawRightString(x, curr_y, line)
            curr_y -= leading
            total_height += leading
    return total_height

def draw_bullet(c, text, x, y, max_width, font_size=9.5, leading=14.0):
    # Draw small gold bullet square
    c.setFillColorRGB(*GOLD)
    c.rect(x, y + 2, 3, 3, fill=1, stroke=0)
    # Draw text next to it
    draw_paragraph(c, text, x + 12, y, max_width - 12, "Helvetica", font_size, leading, TEXT_GREY)

def build_pdf(output_path):
    c = canvas.Canvas(output_path, pagesize=A4)
    
    # ---------------- PAGE 1: COVER PAGE ----------------
    draw_background(c)
    
    # Top Right Metadata Block
    c.setFont("Courier", 7.0)
    c.setFillColorRGB(*TEXT_DARK)
    c.drawString(MR - 120, 750.0, "DOCUMENT REF")
    c.setFont("Courier-Bold", 10.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(MR - 120, 735.0, "MV-2026-085")
    
    c.setFont("Courier", 7.5)
    c.setFillColorRGB(*TEXT_GREY)
    c.drawString(MR - 120, 715.0, "ISSUED  ·  25 MAY 2026")
    c.drawString(MR - 120, 700.0, "VALID UNTIL  ·  24 JUN 2026")
    
    # Main Large Titles
    c.setFont("Times-Italic", 48.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML, 620.0, "EGYGRAFX")
    
    c.setFont("Courier", 10.0)
    c.setFillColorRGB(*TEXT_DARK)
    c.drawString(ML, 595.0, "Wide-Format Printing Technology")
    
    # Accent Line
    c.setLineWidth(0.75)
    c.setStrokeColorRGB(*GOLD)
    c.line(ML, 570.0, MR, 570.0)
    
    # Subtitle
    c.setFont("Times-Italic", 28.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML, 520.0, "B2B Platform Proposal")
    c.setFont("Times-Italic", 22.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, 485.0, "& Commercial Quotation")
    
    # Project Accent Card
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, 350.0, CONTENT_WIDTH, 90.0, fill=1, stroke=0)
    c.setFillColorRGB(*GOLD)
    c.rect(ML, 350.0, 2.0, 90.0, fill=1, stroke=0)
    
    c.setFont("Courier", 7.5)
    c.setFillColorRGB(*TEXT_DARK)
    c.drawString(ML + 14.0, 422.0, "PROJECT")
    
    c.setFont("Times-Italic", 15.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 14.0, 402.0, "EGYGRAFX Corporate Website")
    
    c.setFont("Helvetica", 9.0)
    c.setFillColorRGB(*TEXT_GREY)
    c.drawString(ML + 14.0, 385.0, "Full multi-page B2B website for EGYGRAFX — a large-format printing solutions distributor")
    c.drawString(ML + 14.0, 371.0, "serving Egypt & the Middle East. Transitioning legacy listings to lead generation.")
    
    # Prepared For / By Two-Column Block
    c.setStrokeColorRGB(*LINE_COLOR)
    c.setLineWidth(0.5)
    c.line(ML, 290.0, MR, 290.0)
    
    # Column 1: Prepared For
    c.setFont("Courier", 7.5)
    c.setFillColorRGB(*TEXT_DARK)
    c.drawString(ML, 270.0, "PREPARED FOR")
    c.setFont("Times-Italic", 16.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML, 250.0, "Eng. Ashraf")
    c.setFont("Helvetica", 9.5)
    c.setFillColorRGB(*TEXT_GREY)
    c.drawString(ML, 235.0, "EGYGRAFX")
    c.drawString(ML, 222.0, "Executive Director")
    
    # Column 2: Prepared By
    c.setFont("Courier", 7.5)
    c.setFillColorRGB(*TEXT_DARK)
    c.drawString(ML + 265.0, 270.0, "PREPARED BY")
    c.setFont("Times-Italic", 16.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 265.0, 250.0, "Michael Mitry")
    c.setFont("Helvetica", 9.5)
    c.setFillColorRGB(*TEXT_GREY)
    c.drawString(ML + 265.0, 235.0, "Mitry Visuals")
    c.drawString(ML + 265.0, 222.0, "michaelmitry13@gmail.com")
    c.drawString(ML + 265.0, 209.0, "+20 100 068 0580")
    
    # Footer on Cover Page
    c.line(ML, 48.0, MR, 48.0)
    c.setFont("Courier", 7.5)
    c.setFillColorRGB(*TEXT_DARK)
    c.drawString(ML, 35.0, "MITRY VISUALS  ·  MI5A.COM  ·  CAIRO, EGYPT")
    c.drawRightString(MR, 35.0, "Valid Until: 24 June 2026")
    
    c.showPage()
    
    # ---------------- PAGE 2: EXECUTIVE SUMMARY & BRAND VISION ----------------
    draw_background(c)
    draw_header_footer(c, 2)
    
    # Page Heading
    c.setFont("Times-Italic", 22.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, 740.0, "01")
    c.setFont("Times-Italic", 20.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 32.0, 740.0, "Executive Summary & Brand Vision")
    c.setLineWidth(0.5)
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML, 728.0, MR, 728.0)
    
    # Paragraph
    intro_txt = (
        "EGYGRAFX is a recognized market leader with over 30 years of experience, 3,500+ fleet installations, "
        "and partnerships with premier global brands including HP, Monti Antonio, and GBOS. This proposal shifts the "
        "platform from a traditional product listing directory toward a dynamic, customer-centric B2B lead generator:"
    )
    draw_paragraph(c, intro_txt, ML, 705.0, CONTENT_WIDTH, "Helvetica", 9.5, 14.0, TEXT_GREY)
    
    # Paradigm Shift Box
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, 605.0, CONTENT_WIDTH, 45.0, fill=1, stroke=0)
    c.setFillColorRGB(*GOLD)
    c.rect(ML, 605.0, 2.0, 45.0, fill=1, stroke=0)
    c.setFont("Courier-Bold", 13.0)
    c.setFillColorRGB(*GOLD)
    c.drawCentredString(ML + CONTENT_WIDTH/2.0, 622.0, "YOUR APPLICATIONS  ↔  OUR SOLUTIONS")
    
    # Sales Story
    c.setFont("Times-Italic", 15.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML, 565.0, "The B2B Sales Story: Nour's Journey")
    story_intro = "To illustrate how this system drives business growth, consider Nour — a textile business owner expanding into fast fashion:"
    draw_paragraph(c, story_intro, ML, 545.0, CONTENT_WIDTH, "Helvetica", 9.5, 14.0, TEXT_GREY)
    
    # Vertical story sequence steps
    steps = [
        ("01", "The Entry", "Nour lands on the new EGYGRAFX.COM — fast, premium, and highly professional."),
        ("02", "Application Hub", "Greeted with: \"What is your application?\" — she clicks Home Textile & Fast Fashion."),
        ("03", "Integrated Suite", "Instantly sees the DGI Poseidon II with matched INKTEX inks and transfer papers — a complete solution in one screen."),
        ("04", "Lead Capture", "Selects her configuration → clicks Request a Quote. A branded PDF lands in her inbox; the sales desk gets a pre-qualified lead sheet instantly."),
        ("05", "The Close", "Your team calls Nour with a tailored proposal — the deal is closed.")
    ]
    
    curr_y = 500.0
    for num, title, desc in steps:
        c.setFont("Courier-Bold", 10.0)
        c.setFillColorRGB(*GOLD)
        c.drawString(ML, curr_y, num)
        
        c.setFont("Times-Italic", 11.0)
        c.setFillColorRGB(*TEXT_WHITE)
        c.drawString(ML + 27.0, curr_y, title)
        
        draw_paragraph(c, desc, ML + 27.0, curr_y - 13.0, CONTENT_WIDTH - 27.0, "Helvetica", 9.0, 12.0, TEXT_GREY)
        curr_y -= 52.0
        
    c.showPage()
    
    # ---------------- PAGE 3: ARCHITECTURE, SITEMAP & REBRANDING ----------------
    draw_background(c)
    draw_header_footer(c, 3)
    
    # Page Heading
    c.setFont("Times-Italic", 22.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, 740.0, "02")
    c.setFont("Times-Italic", 20.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 32.0, 740.0, "Global Information Architecture & Sitemap")
    c.setLineWidth(0.5)
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML, 728.0, MR, 728.0)
    
    # Sitemap items
    sitemap = [
        ("Home Gateway", "Interactive applications grid, live installation counters, and primary supplier brand logos."),
        ("Applications (9 Sectors)", "Home Textile & Fast Fashion · T-Shirts & Piece Printing · Carpet, Mats & Rugs · Hi-Tech Industrial CAD/CAM · Signage & Display · Wall Covering & Home Décor · Outdoor Advertising · Packaging & Labeling · Promotional & Personalization"),
        ("Products Catalog", "Filters for printers, finishing cutters, calenders — sorted by brand."),
        ("Consumables Catalog", "Inks (sublimation, latex, UV, solvent) · Papers & PET Films · Replacement Parts (filters, printheads, capping stations)."),
        ("Fleet Support & Services", "Installation requests, preventative maintenance, ICC profiling, and onsite training schedules.")
    ]
    
    curr_y = 705.0
    for title, desc in sitemap:
        c.setFont("Times-Italic", 11.0)
        c.setFillColorRGB(*TEXT_WHITE)
        c.drawString(ML + 12.0, curr_y, title)
        c.setFillColorRGB(*GOLD)
        c.rect(ML, curr_y + 2.0, 3.0, 3.0, fill=1, stroke=0)
        
        # Wrapped description
        h = draw_paragraph(c, desc, ML + 12.0, curr_y - 12.0, CONTENT_WIDTH - 12.0, "Helvetica", 9.0, 12.0, TEXT_GREY)
        curr_y -= (20.0 + h)
        
    # Rebranding Synthesis Heading
    curr_y += 5.0
    c.setFont("Times-Italic", 18.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, curr_y, "03")
    c.setFont("Times-Italic", 16.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 27.0, curr_y, "Visual Rebranding Synthesis")
    c.line(ML, curr_y - 8.0, MR, curr_y - 8.0)
    
    curr_y -= 25.0
    rebrand_para = "Applying the Xerox Rebranding Framework, we transition the legacy identity into a warm, high-tech B2B supplier profile."
    draw_paragraph(c, rebrand_para, ML, curr_y, CONTENT_WIDTH, "Helvetica", 9.0, 12.0, TEXT_GREY)
    
    # Rebranding Table
    curr_y -= 35.0
    # Header Row
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, curr_y, CONTENT_WIDTH, 15.0, fill=1, stroke=0)
    c.setFont("Courier-Bold", 7.5)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML + 5.0, curr_y + 4.0, "VISUAL ELEMENT")
    c.drawString(ML + 125.0, curr_y + 4.0, "LEGACY IDENTITY")
    c.drawString(ML + 305.0, curr_y + 4.0, "PROPOSED REBRAND")
    
    # Table rows
    rows = [
        ("Typography", "Sharp serif all-caps — EGYGRAFX SAE", "Bold rounded geometric sans — EGYGRAFX."),
        ("Iconography", "Literal CMYK color grid block", "Typography-Only Wordmark (Clean corporate focus)"),
        ("Color Palette", "Cyan, Magenta, Yellow offset channels", "Deep Crimson · Digital Coral · Charcoal Slate"),
        ("Visual Friction", "High — rigid, traditional corporate", "Low — warm, human-centered innovative tech hub")
    ]
    
    c.setLineWidth(0.5)
    for title, legacy, proposed in rows:
        curr_y -= 32.0
        c.setStrokeColorRGB(*LINE_COLOR)
        c.line(ML, curr_y - 4.0, MR, curr_y - 4.0)
        
        c.setFont("Times-Italic", 9.5)
        c.setFillColorRGB(*GOLD)
        c.drawString(ML + 5.0, curr_y + 8.0, title)
        
        c.setFont("Helvetica", 8.5)
        c.setFillColorRGB(*TEXT_GREY)
        c.drawString(ML + 125.0, curr_y + 8.0, legacy)
        
        c.setFont("Helvetica-Bold", 9.0)
        c.setFillColorRGB(*TEXT_WHITE)
        draw_paragraph(c, proposed, ML + 305.0, curr_y + 8.0, CONTENT_WIDTH - 305.0, "Helvetica-Bold", 9.0, 11.0, TEXT_WHITE)
        
    c.showPage()
    
    # ---------------- PAGE 4: HOW THE TECHNOLOGY WORKS ----------------
    draw_background(c)
    draw_header_footer(c, 4)
    
    # Page Heading
    c.setFont("Times-Italic", 22.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, 740.0, "04")
    c.setFont("Times-Italic", 20.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 32.0, 740.0, "How the Technology Works")
    c.setLineWidth(0.5)
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML, 728.0, MR, 728.0)
    
    # Tech Blocks
    tech_blocks = [
        ("Digital Filing Cabinet (Headless CMS)", "Firebase Firestore + Clerk Auth admin dashboard. Team updates machine specs or pricing with one click — no developers, no maintenance fees."),
        ("Smart Google Signposts (Programmatic SEO)", "Every machine, brand, and category auto-generates a dynamic, high-ranking Google page. Clients searching 'Kyocera sublimation Egypt' land directly on your product."),
        ("Automated Sales Desk (RFQ Engine)", "Runs 24/7: captures exact machine configs, delivers PDF brochures automatically, and routes pre-qualified hot lead sheets to your sales team."),
        ("72-Hour Live Deploy (Domain Integration)", "The production build is connected directly to your existing EGYGRAFX.COM domain — no waiting, no migration. Your new platform goes live within 72 hours of final sign-off."),
        ("Role-Based Staff Access (Team Permissions)", "Every EGYGRAFX staff member gets a defined login role — Marketeer, Copywriter, or IT/Admin — each with tailored permissions so the right people access only the tools they need."),
        ("Live Analytics & Heatmap Dashboard (Traffic Intelligence)", "Real-time visitor traffic, scroll heatmaps, click maps, and session recordings surface exactly which application sectors attract the most interest and where the site needs refinement or deeper content focus.")
    ]
    
    curr_y = 700.0
    for title, desc in tech_blocks:
        c.setFont("Times-Italic", 12.0)
        c.setFillColorRGB(*TEXT_WHITE)
        c.drawString(ML + 12.0, curr_y, title)
        c.setFillColorRGB(*GOLD)
        c.rect(ML, curr_y + 2.0, 3.0, 3.0, fill=1, stroke=0)
        
        h = draw_paragraph(c, desc, ML + 12.0, curr_y - 12.0, CONTENT_WIDTH - 12.0, "Helvetica", 9.5, 13.5, TEXT_GREY)
        curr_y -= (22.0 + h)
        
    c.showPage()
    
    # ---------------- PAGE 5: COMMERCIAL LINE ITEMS ----------------
    draw_background(c)
    draw_header_footer(c, 5)
    
    # Page Heading
    c.setFont("Times-Italic", 22.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, 740.0, "05")
    c.setFont("Times-Italic", 20.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 32.0, 740.0, "Commercial Line Items")
    c.setLineWidth(0.5)
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML, 728.0, MR, 728.0)
    
    # Table Header Row
    curr_y = 705.0
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, curr_y - 15.0, CONTENT_WIDTH, 15.0, fill=1, stroke=0)
    c.setFont("Courier-Bold", 7.5)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML + 5.0, curr_y - 11.0, "DESCRIPTION")
    c.drawString(ML + 380.0, curr_y - 11.0, "QTY")
    c.drawString(ML + 440.0, curr_y - 11.0, "AMOUNT (USD)")
    
    # Table Rows
    items = [
        ("1. Website in 72 Hours — Base Package", "Custom UI/UX design, responsive mobile-first build, SEO-optimized structure, contact form & analytics, unlimited revisions, deployed on Google Cloud Run. Stack: React, HTML/CSS, Vercel.", "1", "$300.00"),
        ("2. Extended Multi-Page Architecture", "9-section navigation structure (Home, About, Products, Applications, Solutions, Consumables, Service, Contact) with consistent layout system, sub-page templates, and internal linking.", "1", "$150.00"),
        ("3. Supplier & Brand Directory Pages", "Structured pages for 12+ supplier brands (ORIC, HP, BYDi, JHF, Monti Antonio, GBOS, DGI, LDP, MagicJet, WitColor, Summa, Neolt) with spec layouts.", "1", "$120.00"),
        ("4. Applications & Solutions Category Pages", "9 industry verticals (Home Textile, T-Shirts & DTG, Carpet & Rugs, Signage & Display, Wall Covering, Outdoor Advertising, Packaging, Automotive CAD/CAM, Promotional) with dynamic mappings.", "1", "$100.00"),
        ("5. Consumables Section", "Inks, Paper & Film, and Spare Parts sub-pages with clean product listing layouts.", "1", "$50.00"),
        ("6. Headless CMS & Cloud Database Integration", "Firebase Firestore NoSQL database setup. Includes secure Clerk administrative dashboard for real-time stock/spec updates. Role-based access: Marketeer, Copywriter, IT/Admin.", "1", "$450.00"),
        ("7. Interactive RFQ Configurator & Lead Engine", "B2B configuration portal. Allows custom printhead/ink/width selections, triggers automated PDF brochure emails, and logs pre-qualified leads.", "1", "$280.00"),
        ("8. Live Analytics & Heatmap Dashboard", "Real-time scroll & click heatmaps, session recordings, and Google Analytics tracking to audit buyer actions and maximize high-performing sectors.", "1", "Included")
    ]
    
    curr_y -= 15.0
    c.setLineWidth(0.5)
    for title, desc, qty, amt in items:
        curr_y -= 45.0
        c.setStrokeColorRGB(*LINE_COLOR)
        c.line(ML, curr_y - 4.0, MR, curr_y - 4.0)
        
        c.setFont("Times-Italic", 10.0)
        c.setFillColorRGB(*TEXT_WHITE)
        c.drawString(ML + 5.0, curr_y + 30.0, title)
        
        draw_paragraph(c, desc, ML + 5.0, curr_y + 18.0, 365.0, "Helvetica", 8.0, 10.5, TEXT_GREY)
        
        c.setFont("Courier", 9.0)
        c.setFillColorRGB(*TEXT_GREY)
        c.drawString(ML + 385.0, curr_y + 30.0, qty)
        
        c.setFont("Courier", 9.0)
        if amt == "Included":
            c.setFillColorRGB(*GOLD)
            c.drawString(ML + 440.0, curr_y + 30.0, amt)
        else:
            c.setFillColorRGB(*TEXT_WHITE)
            c.drawString(ML + 440.0, curr_y + 30.0, amt)
            
    # Subtotal and Total block
    curr_y -= 35.0
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML + 260.0, curr_y, MR, curr_y)
    
    c.setFont("Courier", 9.5)
    c.setFillColorRGB(*TEXT_GREY)
    c.drawString(ML + 270.0, curr_y - 15.0, "Subtotal")
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawRightString(MR, curr_y - 15.0, "$1,450.00")
    
    c.setFillColorRGB(*TEXT_GREY)
    c.drawString(ML + 270.0, curr_y - 30.0, "Tax / VAT (0.5%)")
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawRightString(MR, curr_y - 30.0, "$7.25")
    
    c.line(ML + 260.0, curr_y - 40.0, MR, curr_y - 40.0)
    
    c.setFont("Times-Italic", 22.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 270.0, curr_y - 68.0, "Total")
    c.setFillColorRGB(*GOLD)
    c.drawRightString(MR, curr_y - 68.0, "$1,457.25")
    
    c.showPage()
    
    # ---------------- PAGE 6: TIMELINE, MILESTONES & OPERATIONAL COSTS ----------------
    draw_background(c)
    draw_header_footer(c, 6)
    
    # Page Heading
    c.setFont("Times-Italic", 22.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, 740.0, "06")
    c.setFont("Times-Italic", 20.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 32.0, 740.0, "Timeline & Payment Milestones")
    c.setLineWidth(0.5)
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML, 728.0, MR, 728.0)
    
    # Paragraph
    curr_y = 705.0
    timeline_para = (
        "Four clear, verified handover milestones. Timeline: 25–30 business days from asset delivery & "
        "database schema sign-off. Upon final approval, the production build connects to EGYGRAFX.COM and goes live within 72 hours."
    )
    draw_paragraph(c, timeline_para, ML, curr_y, CONTENT_WIDTH, "Helvetica", 9.5, 14.0, TEXT_GREY)
    
    # Milestones Table
    curr_y -= 45.0
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, curr_y - 15.0, CONTENT_WIDTH, 15.0, fill=1, stroke=0)
    c.setFont("Courier-Bold", 7.5)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML + 5.0, curr_y - 11.0, "PAYMENT")
    c.drawString(ML + 65.0, curr_y - 11.0, "AMOUNT")
    c.drawString(ML + 125.0, curr_y - 11.0, "MILESTONE")
    c.drawString(ML + 265.0, curr_y - 11.0, "DELIVERABLES")
    
    milestones = [
        ("25%", "$362.50", "Milestone 1 Deposit & Design", "Complete visual rebranding mockups, logo guidelines, sitemap layout sign-off."),
        ("30%", "$435.00", "Milestone 2 Staging Integration", "Frontend catalog and all 9 application hubs deployed to staging."),
        ("35%", "$507.50", "Milestone 3 Backend & DB Lock", "Firestore database collections, Clerk admin panel, RFQ configurator deployed."),
        ("10%", "$145.00", "Milestone 4 Production Handoff", "Go-live domain config, automated SEO registration, team training handoff.")
    ]
    
    curr_y -= 15.0
    for pct, amt, title, dels in milestones:
        curr_y -= 42.0
        c.setStrokeColorRGB(*LINE_COLOR)
        c.line(ML, curr_y - 4.0, MR, curr_y - 4.0)
        
        c.setFont("Courier-Bold", 9.5)
        c.setFillColorRGB(*GOLD)
        c.drawString(ML + 5.0, curr_y + 14.0, pct)
        
        c.setFont("Courier", 9.5)
        c.setFillColorRGB(*TEXT_WHITE)
        c.drawString(ML + 65.0, curr_y + 14.0, amt)
        
        c.setFont("Times-Italic", 9.5)
        c.setFillColorRGB(*TEXT_WHITE)
        c.drawString(ML + 125.0, curr_y + 14.0, title)
        
        draw_paragraph(c, dels, ML + 265.0, curr_y + 20.0, CONTENT_WIDTH - 265.0, "Helvetica", 8.0, 10.5, TEXT_GREY)
        
    # Section 07
    curr_y -= 35.0
    c.setFont("Times-Italic", 18.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, curr_y, "07")
    c.setFont("Times-Italic", 16.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 27.0, curr_y, "Ongoing Operational Costs")
    c.line(ML, curr_y - 8.0, MR, curr_y - 8.0)
    
    curr_y -= 25.0
    ops_txt = "Modern serverless architecture keeps ongoing costs exceptionally low. Since EGYGRAFX already owns EGYGRAFX.COM, recurring expenses are:"
    draw_paragraph(c, ops_txt, ML, curr_y, CONTENT_WIDTH, "Helvetica", 9.0, 12.0, TEXT_GREY)
    
    # Costs Table
    curr_y -= 30.0
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, curr_y - 15.0, CONTENT_WIDTH, 15.0, fill=1, stroke=0)
    c.setFont("Courier-Bold", 7.5)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML + 5.0, curr_y - 11.0, "SERVICE")
    c.drawString(ML + 175.0, curr_y - 11.0, "COST")
    c.drawString(ML + 275.0, curr_y - 11.0, "FREE TIER DETAILS")
    
    costs = [
        ("Google Firebase Database", "$0 / month", "Free tier covers up to 50,000 reads & 20,000 writes per day"),
        ("Clerk Admin Authentication", "$0 / month", "Free tier covers up to 10,000 active monthly users"),
        ("Vercel Edge Hosting", "$0–$20 / month", "Free tier standard; $20/mo Pro optional for edge security"),
        ("Brochure Email (Resend)", "$0 / month", "Free tier covers up to 3,000 transaction emails per month")
    ]
    
    curr_y -= 15.0
    for name, cost, details in costs:
        curr_y -= 26.0
        c.setStrokeColorRGB(*LINE_COLOR)
        c.line(ML, curr_y - 4.0, MR, curr_y - 4.0)
        
        c.setFont("Times-Italic", 9.5)
        c.setFillColorRGB(*TEXT_WHITE)
        c.drawString(ML + 5.0, curr_y + 4.0, name)
        
        c.setFont("Courier-Bold", 9.0)
        if "$0" in cost:
            c.setFillColorRGB(*GOLD)
        else:
            c.setFillColorRGB(*TEXT_WHITE)
        c.drawString(ML + 175.0, curr_y + 4.0, cost)
        
        c.setFont("Helvetica", 8.5)
        c.setFillColorRGB(*TEXT_GREY)
        c.drawString(ML + 275.0, curr_y + 4.0, details)
        
    c.showPage()
    
    # ---------------- PAGE 7: PLATFORM ARCHITECTURE & BUYER FLOWS ----------------
    draw_background(c)
    draw_header_footer(c, 7)
    
    # Page Heading
    c.setFont("Times-Italic", 22.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, 740.0, "08")
    c.setFont("Times-Italic", 20.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 32.0, 740.0, "Platform Architecture & Customer Flows")
    c.setLineWidth(0.5)
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML, 728.0, MR, 728.0)
    
    # Intro
    curr_y = 705.0
    arch_para = (
        "The diagrams below map exactly how the platform behaves — from the moment a B2B buyer arrives, "
        "through the site's navigation structure, down to how your team manages content behind the scenes."
    )
    draw_paragraph(c, arch_para, ML, curr_y, CONTENT_WIDTH, "Helvetica", 9.5, 14.0, TEXT_GREY)
    
    # Section 1
    curr_y -= 45.0
    c.setFont("Times-Italic", 13.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML, curr_y, "1 · The B2B Buyer's Journey")
    
    curr_y -= 20.0
    journey_desc = (
        "Instead of forcing buyers through thousands of disjointed parts, the platform routes them by industry sector "
        "on arrival. A buyer like Nour self-identifies, lands on a dedicated hub, sees best-fit machinery with auto-matched "
        "consumables, configures her setup, and requests a quote — at which point your sales desk receives a pre-qualified "
        "hot lead and she receives a branded PDF brochure."
    )
    draw_paragraph(c, journey_desc, ML, curr_y, CONTENT_WIDTH, "Helvetica", 9.5, 14.0, TEXT_GREY)
    
    # Draw B2B Buyer's Journey Flowchart
    curr_y -= 130.0
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, curr_y, CONTENT_WIDTH, 110.0, fill=1, stroke=0)
    c.setFillColorRGB(*GOLD)
    c.rect(ML, curr_y + 108.0, CONTENT_WIDTH, 2.0, fill=1, stroke=0)
    
    # Flow Line
    c.setStrokeColorRGB(*LINE_COLOR)
    c.setLineWidth(1.5)
    c.line(ML + 50.0, curr_y + 60.0, MR - 50.0, curr_y + 60.0)
    
    # Circles & Steps
    flow_steps = [
        (ML + 50.0, "Buyer Arrives", "EGYGRAFX.COM"),
        (ML + 165.0, "Industry Hub", "Home Textile"),
        (ML + 280.0, "Tailored Suite", "Printer + Inks"),
        (ML + 395.0, "RFQ Capture", "Instant Brochure"),
        (ML + 450.0, "Sales Close", "Qualified Lead")
    ]
    
    for x, title, sub in flow_steps:
        # Outer ring
        c.setStrokeColorRGB(*GOLD)
        c.setFillColorRGB(*BG_COLOR)
        c.circle(x, curr_y + 60.0, 7.0, fill=1, stroke=1)
        # Inner dot
        c.setFillColorRGB(*GOLD)
        c.circle(x, curr_y + 60.0, 3.0, fill=1, stroke=0)
        
        c.setFont("Courier-Bold", 8.0)
        c.setFillColorRGB(*TEXT_WHITE)
        c.drawCentredString(x, curr_y + 40.0, title)
        
        c.setFont("Helvetica", 7.5)
        c.setFillColorRGB(*TEXT_GREY)
        c.drawCentredString(x, curr_y + 25.0, sub)
        
    c.showPage()
    
    # ---------------- PAGE 8: SITE NAVIGATION ARCHITECTURE ----------------
    draw_background(c)
    draw_header_footer(c, 8)
    
    # Page Title
    c.setFont("Times-Italic", 15.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML, 740.0, "2 · Site Navigation Architecture")
    c.setLineWidth(0.5)
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML, 728.0, MR, 728.0)
    
    # Paragraph
    curr_y = 705.0
    nav_desc = (
        "The home gateway branches into four pillars — Applications, Products, Consumables, and Support. "
        "The Applications branch expands into the 9 sector hubs, each leading to individual machine spec pages. "
        "Every node becomes its own semantic URL (e.g. /applications/[sector], /products/[brand-model]) so each "
        "machine and sector ranks independently on Google. All paths ultimately funnel into the RFQ portal where the lead is captured."
    )
    draw_paragraph(c, nav_desc, ML, curr_y, CONTENT_WIDTH, "Helvetica", 9.5, 14.0, TEXT_GREY)
    
    # Draw Site Navigation flowchart
    curr_y -= 380.0
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, curr_y, CONTENT_WIDTH, 360.0, fill=1, stroke=0)
    c.setFillColorRGB(*GOLD)
    c.rect(ML, curr_y + 358.0, CONTENT_WIDTH, 2.0, fill=1, stroke=0)
    
    # Root box
    rx, ry = ML + CONTENT_WIDTH/2.0 - 60.0, curr_y + 300.0
    c.setFillColorRGB(*BG_COLOR)
    c.setStrokeColorRGB(*GOLD)
    c.rect(rx, ry, 120.0, 25.0, fill=1, stroke=1)
    c.setFont("Courier-Bold", 8.0)
    c.setFillColorRGB(*GOLD)
    c.drawCentredString(rx + 60.0, ry + 8.0, "HOME GATEWAY")
    
    # Main trunk
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(rx + 60.0, ry, rx + 60.0, ry - 35.0)
    c.line(ML + 50.0, ry - 35.0, MR - 50.0, ry - 35.0)
    
    # Secondary branches
    branch_x = [ML + 50.0, ML + 165.0, ML + 280.0, ML + 395.0, ML + 450.0]  # adjusted mapping
    # Just draw 4 clean trunks
    trunks = [
        (ML + 50.0, "Applications Hub"),
        (ML + 180.0, "Products Catalog"),
        (ML + 310.0, "Consumables"),
        (MR - 50.0, "Fleet Support")
    ]
    
    for tx, name in trunks:
        c.setStrokeColorRGB(*LINE_COLOR)
        c.line(tx, ry - 35.0, tx, ry - 75.0)
        c.setFillColorRGB(*BG_COLOR)
        c.rect(tx - 45.0, ry - 100.0, 90.0, 25.0, fill=1, stroke=1)
        c.setFont("Times-Italic", 9.0)
        c.setFillColorRGB(*TEXT_WHITE)
        c.drawCentredString(tx, ry - 92.0, name)
        
    # Draw sub-items for applications and products leading to funnel
    c.line(ML + 50.0, ry - 100.0, ML + 50.0, ry - 150.0)
    # Applications sectors
    c.setFont("Helvetica", 7.0)
    c.setFillColorRGB(*TEXT_GREY)
    c.drawString(ML + 10.0, ry - 130.0, "· 9 Industry Verticals")
    c.drawString(ML + 10.0, ry - 142.0, "· Home Textile & Apparel")
    
    c.line(ML + 180.0, ry - 100.0, ML + 180.0, ry - 150.0)
    c.drawString(ML + 140.0, ry - 130.0, "· 12+ Premium Brands")
    c.drawString(ML + 140.0, ry - 142.0, "· Spec sheets & layouts")
    
    # Common funnel background connector
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML + 50.0, ry - 150.0, MR - 50.0, ry - 150.0)
    c.line(rx + 60.0, ry - 150.0, rx + 60.0, ry - 200.0)
    
    # RFQ Box at bottom
    c.setFillColorRGB(*BG_COLOR)
    c.setStrokeColorRGB(*GOLD)
    c.rect(rx - 10.0, ry - 235.0, 140.0, 35.0, fill=1, stroke=1)
    
    c.setFont("Courier-Bold", 8.5)
    c.setFillColorRGB(*GOLD)
    c.drawCentredString(rx + 60.0, ry - 215.0, "RFQ PORTAL ENGINE")
    c.setFont("Helvetica", 7.0)
    c.setFillColorRGB(*TEXT_GREY)
    c.drawCentredString(rx + 60.0, ry - 227.0, "Delivers Lead + Auto-Brochure")
    
    c.showPage()
    
    # ---------------- PAGE 9: BACKEND DATA MODEL ----------------
    draw_background(c)
    draw_header_footer(c, 9)
    
    # Page Title
    c.setFont("Times-Italic", 15.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML, 740.0, "3 · Headless Backend & Data Model")
    c.setLineWidth(0.5)
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML, 728.0, MR, 728.0)
    
    # Paragraph
    curr_y = 705.0
    back_desc = (
        "Your team edits content through a role-secured dashboard — Marketeer, Copywriter, and IT/Admin, "
        "each with scoped permissions via Clerk authentication. Changes write to Firestore collections that cross-reference "
        "each other: a machine knows which sectors and consumables it belongs to. Next.js then pre-renders that data into "
        "fast static pages for the buyer — no public database is ever exposed, and no per-page developer work is needed."
    )
    draw_paragraph(c, back_desc, ML, curr_y, CONTENT_WIDTH, "Helvetica", 9.5, 14.0, TEXT_GREY)
    
    # Draw backend block
    curr_y -= 380.0
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, curr_y, CONTENT_WIDTH, 360.0, fill=1, stroke=0)
    c.setFillColorRGB(*GOLD)
    c.rect(ML, curr_y + 358.0, CONTENT_WIDTH, 2.0, fill=1, stroke=0)
    
    # Left box: Admin Panel
    c.setFillColorRGB(*BG_COLOR)
    c.setStrokeColorRGB(*GOLD)
    c.rect(ML + 30.0, curr_y + 200.0, 130.0, 50.0, fill=1, stroke=1)
    c.setFont("Courier-Bold", 8.5)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML + 40.0, curr_y + 233.0, "CLERK AUTH")
    c.setFont("Times-Italic", 10.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 40.0, curr_y + 215.0, "Admin CMS Dashboard")
    
    # Right box: Firestore NoSQL
    c.setFillColorRGB(*BG_COLOR)
    c.setStrokeColorRGB(*GOLD)
    c.rect(MR - 160.0, curr_y + 200.0, 130.0, 50.0, fill=1, stroke=1)
    c.setFont("Courier-Bold", 8.5)
    c.setFillColorRGB(*GOLD)
    c.drawString(MR - 150.0, curr_y + 233.0, "GOOGLE FIRESTORE")
    c.setFont("Times-Italic", 10.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(MR - 150.0, curr_y + 215.0, "NoSQL Collections")
    
    # Arrow between the two
    c.setStrokeColorRGB(*GOLD)
    c.setLineWidth(1.5)
    c.line(ML + 165.0, curr_y + 225.0, MR - 165.0, curr_y + 225.0)
    # Arrowheads
    c.line(ML + 175.0, curr_y + 230.0, ML + 165.0, curr_y + 225.0)
    c.line(ML + 175.0, curr_y + 220.0, ML + 165.0, curr_y + 225.0)
    
    c.line(MR - 175.0, curr_y + 230.0, MR - 165.0, curr_y + 225.0)
    c.line(MR - 175.0, curr_y + 220.0, MR - 165.0, curr_y + 225.0)
    
    # Downward connection to Pre-renders
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(MR - 95.0, curr_y + 200.0, MR - 95.0, curr_y + 130.0)
    c.line(MR - 95.0, curr_y + 130.0, ML + CONTENT_WIDTH/2.0 + 30.0, curr_y + 130.0)
    c.line(ML + CONTENT_WIDTH/2.0, curr_y + 130.0, ML + CONTENT_WIDTH/2.0, curr_y + 80.0)
    
    # Next.js pre-renderer card
    c.setFillColorRGB(*BG_COLOR)
    c.setStrokeColorRGB(*GOLD)
    c.rect(ML + CONTENT_WIDTH/2.0 - 80.0, curr_y + 35.0, 160.0, 45.0, fill=1, stroke=1)
    c.setFont("Courier-Bold", 8.5)
    c.setFillColorRGB(*GOLD)
    c.drawCentredString(ML + CONTENT_WIDTH/2.0, curr_y + 63.0, "NEXT.JS ENGINE")
    c.setFont("Times-Italic", 9.5)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawCentredString(ML + CONTENT_WIDTH/2.0, curr_y + 48.0, "Static Pre-Render Page Build")
    
    c.showPage()
    
    # ---------------- PAGE 10: TECHNOLOGY COMPARISON ----------------
    draw_background(c)
    draw_header_footer(c, 10)
    
    # Page Heading
    c.setFont("Times-Italic", 22.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, 740.0, "09")
    c.setFont("Times-Italic", 20.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 32.0, 740.0, "Technology Stack: Serverless vs. WordPress")
    c.setLineWidth(0.5)
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML, 728.0, MR, 728.0)
    
    # Paragraph
    curr_y = 705.0
    comp_intro = (
        "To ensure a transparent technical rationale, below is a direct comparison showing why the proposed modern "
        "serverless stack is vastly superior to a traditional monolithic WordPress setup for EGYGRAFX's specific enterprise requirements."
    )
    draw_paragraph(c, comp_intro, ML, curr_y, CONTENT_WIDTH, "Helvetica", 9.5, 14.0, TEXT_GREY)
    
    # Comparison Table
    curr_y -= 45.0
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, curr_y - 15.0, CONTENT_WIDTH, 15.0, fill=1, stroke=0)
    c.setFont("Courier-Bold", 7.5)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML + 5.0, curr_y - 11.0, "OPERATIONAL ATTRIBUTE")
    c.drawString(ML + 125.0, curr_y - 11.0, "MONOLITHIC WORDPRESS (LEGACY)")
    c.drawString(ML + 315.0, curr_y - 11.0, "PROPOSED SERVERLESS STACK")
    
    comparisons = [
        ("Speed / Load Time", "SLOW — Queries heavy databases on every page load, slowing image deliveries.", "BLAZING FAST — Pages statically pre-rendered & served globally from CDNs."),
        ("Hacking & Security", "HIGH RISK — Target of 90% of web hacking attempts. Heavy maintenance updates.", "IRONCLAD — Zero public-facing databases exposed. Hacker-proof by design."),
        ("Catalog Database", "RIGID — Designed for blogs; struggles with complex machinery-to-parts relation structures.", "FLEXIBLE — Google Firestore maps rich catalog lists & spec relationships naturally."),
        ("Monthly Support", "HIGH — Requires monthly maintenance contract SLA for security patches & fixes.", "ZERO — Deployed serverless codebase runs indefinitely with no developer support."),
        ("Hosting Overhead", "$25 – $80 / month for dedicated high-bandwidth B2B-grade server hosts.", "$0 to $20 / month max — scales automatically inside Google free quotas.")
    ]
    
    curr_y -= 15.0
    for attr, wp, sl in comparisons:
        curr_y -= 52.0
        c.setStrokeColorRGB(*LINE_COLOR)
        c.line(ML, curr_y - 4.0, MR, curr_y - 4.0)
        
        c.setFont("Times-Italic", 9.5)
        c.setFillColorRGB(*GOLD)
        c.drawString(ML + 5.0, curr_y + 36.0, attr)
        
        c.setFont("Helvetica", 8.0)
        c.setFillColorRGB(*TEXT_GREY)
        draw_paragraph(c, wp, ML + 125.0, curr_y + 36.0, 180.0, "Helvetica", 8.0, 10.5, TEXT_GREY)
        
        c.setFont("Helvetica-Bold", 8.5)
        c.setFillColorRGB(*TEXT_WHITE)
        draw_paragraph(c, sl, ML + 315.0, curr_y + 36.0, CONTENT_WIDTH - 315.0, "Helvetica-Bold", 8.5, 11.0, TEXT_WHITE)
        
    # Strategic Recommendation
    curr_y -= 30.0
    c.setFont("Courier-Bold", 8.5)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, curr_y, "STRATEGIC RECOMMENDATION")
    
    rec_text = (
        "For EGYGRAFX, the Serverless Stack is the optimal business choice. It represents a secure, high-speed "
        "corporate asset that eliminates monthly developer maintenance fees and provides the exact relational database "
        "structure required to power Nour's B2B inquiry journey cleanly and at scale."
    )
    draw_paragraph(c, rec_text, ML, curr_y - 15.0, CONTENT_WIDTH, "Helvetica", 9.5, 14.0, TEXT_GREY)
    
    c.showPage()
    
    # ---------------- PAGE 11: HANDOFF & AUTHORIZATION ----------------
    draw_background(c)
    draw_header_footer(c, 11)
    
    # Page Heading
    c.setFont("Times-Italic", 22.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML, 740.0, "10")
    c.setFont("Times-Italic", 20.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 32.0, 740.0, "Handoff & Authorization")
    c.setLineWidth(0.5)
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML, 728.0, MR, 728.0)
    
    # Paragraph
    curr_y = 705.0
    auth_para = (
        "This proposal represents a complete agreement between Mitry Visuals and EGYGRAFX. "
        "Signing confirms acceptance of the scope, pricing, and milestone schedule detailed above."
    )
    draw_paragraph(c, auth_para, ML, curr_y, CONTENT_WIDTH, "Helvetica", 9.5, 14.0, TEXT_GREY)
    
    # Double columns for signatures
    curr_y -= 45.0
    # Left box: Client Auth
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, curr_y - 190.0, CONTENT_WIDTH/2.0 - 10.0, 180.0, fill=1, stroke=0)
    c.setFillColorRGB(*GOLD)
    c.rect(ML, curr_y - 190.0, 2.0, 180.0, fill=1, stroke=0)
    
    c.setFont("Courier-Bold", 8.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(ML + 12.0, curr_y - 30.0, "CLIENT AUTHORIZATION")
    c.setFont("Courier", 7.5)
    c.setFillColorRGB(*TEXT_DARK)
    c.drawString(ML + 12.0, curr_y - 55.0, "Signature")
    
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(ML + 12.0, curr_y - 100.0, ML + CONTENT_WIDTH/2.0 - 22.0, curr_y - 100.0)
    
    c.setFont("Times-Italic", 11.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(ML + 12.0, curr_y - 122.0, "Name: Eng. Ashraf")
    c.setFont("Helvetica", 9.0)
    c.setFillColorRGB(*TEXT_GREY)
    c.drawString(ML + 12.0, curr_y - 140.0, "Title: Executive Director, EGYGRAFX")
    c.drawString(ML + 12.0, curr_y - 156.0, "Date: ____________________")
    
    # Right box: Architect Auth
    rx = ML + CONTENT_WIDTH/2.0 + 10.0
    c.setFillColorRGB(*PANEL_BG)
    c.rect(rx, curr_y - 190.0, CONTENT_WIDTH/2.0 - 10.0, 180.0, fill=1, stroke=0)
    c.setFillColorRGB(*GOLD)
    c.rect(rx, curr_y - 190.0, 2.0, 180.0, fill=1, stroke=0)
    
    c.setFont("Courier-Bold", 8.0)
    c.setFillColorRGB(*GOLD)
    c.drawString(rx + 12.0, curr_y - 30.0, "ARCHITECT HANDOFF")
    c.setFont("Courier", 7.5)
    c.setFillColorRGB(*TEXT_DARK)
    c.drawString(rx + 12.0, curr_y - 55.0, "Signature")
    
    c.setStrokeColorRGB(*LINE_COLOR)
    c.line(rx + 12.0, curr_y - 100.0, rx + CONTENT_WIDTH/2.0 - 22.0, curr_y - 100.0)
    
    c.setFont("Times-Italic", 11.0)
    c.setFillColorRGB(*TEXT_WHITE)
    c.drawString(rx + 12.0, curr_y - 122.0, "Name: Michael Mitry")
    c.setFont("Helvetica", 9.0)
    c.setFillColorRGB(*TEXT_GREY)
    c.drawString(rx + 12.0, curr_y - 140.0, "Title: Mitry Visuals")
    c.drawString(rx + 12.0, curr_y - 156.0, "Date: 25 May 2026")
    
    # Bottom callout block
    curr_y -= 220.0
    c.setFillColorRGB(*PANEL_BG)
    c.rect(ML, curr_y - 105.0, CONTENT_WIDTH, 95.0, fill=1, stroke=0)
    c.setFillColorRGB(*GOLD)
    c.rect(ML, curr_y - 105.0, 2.0, 95.0, fill=1, stroke=0)
    
    final_quote = (
        "\"Transitioning EGYGRAFX from legacy listings to an application-driven lead generation asset "
        "will directly capture qualified sales inquiries and empower your team with complete, self-managed "
        "inventory control. Excited to partner on this modern rebrand!\""
    )
    draw_paragraph(c, final_quote, ML + 15.0, curr_y - 25.0, CONTENT_WIDTH - 25.0, "Times-Italic", 11.0, 15.0, TEXT_GREY)
    
    c.setFont("Courier-Bold", 8.5)
    c.setFillColorRGB(*GOLD)
    c.drawRightString(MR - 15.0, curr_y - 88.0, "— Michael Mitry, Mitry Visuals")
    
    c.showPage()
    
    # Save the beautiful PDF!
    c.save()
    print("PDF Compiled successfully!")

if __name__ == "__main__":
    pdf_dir = "C:\\EGYGRAFX WEBSITE\\pdf"
    if not os.path.exists(pdf_dir):
        os.makedirs(pdf_dir)
    target_path = os.path.join(pdf_dir, "EGYGRAFX_Proposal_MV-2026-085_final.pdf")
    build_pdf(target_path)
